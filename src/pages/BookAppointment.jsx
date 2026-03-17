import { useState } from "react";
import emailjs from "@emailjs/browser";
import { entities } from "@/api/entities";
import { FALLBACK_SERVICES } from "./Services";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, ArrowLeft, CalendarDays, RefreshCw } from "lucide-react";
import { format, addDays, isSunday, isMonday, isBefore, startOfToday } from "date-fns";

const EMAILJS_SERVICE = "service_wb2luhb";
const EMAILJS_TEMPLATE = "template_7px4fcr";
const EMAILJS_KEY = "kVah_Ts-0oKsp7p9A";
const GF_EMAIL = "veloire.info@gmail.com";

async function sendConfirmationEmails({ client_name, email, service_name, date, time, price, notes }) {
  const params = {
    client_name,
    service_name,
    date,
    time,
    price: price > 0 ? `£${price}` : "Quote / Price on request",
    notes: notes || "None",
  };
  // Send to client
  await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { ...params, to_email: email, client_email: email }, EMAILJS_KEY);
  // Send to your gf
  await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { ...params, to_email: GF_EMAIL, client_email: email }, EMAILJS_KEY);
}

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const SAT_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00",
];

export default function BookAppointment() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedService = urlParams.get("service");

  const [step, setStep] = useState(preselectedService ? 2 : 1);
  const [selectedService, setSelectedService] = useState(preselectedService || "");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ client_name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["veloire_services"],
    queryFn: async () => {
      try {
        const data = await entities.Service.list();
        return data.length > 0 ? data : FALLBACK_SERVICES;
      } catch { return FALLBACK_SERVICES; }
    },
  });

  const { data: blockedDates = [] } = useQuery({
    queryKey: ["veloire_blocked_dates"],
    queryFn: () => entities.BlockedDate.list(),
    staleTime: 60000,
  });
  const blockedSet = new Set(blockedDates.map(d => d.date));

  const { data: bookingsOnDate = [], isFetching: checkingAvailability } = useQuery({
    queryKey: ["veloire_bookings_date", selectedDate ? format(selectedDate, "yyyy-MM-dd") : null],
    queryFn: () => entities.Booking.filter({ date: format(selectedDate, "yyyy-MM-dd") }),
    enabled: !!selectedDate,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const createBooking = useMutation({
    mutationFn: (data) => entities.Booking.create(data),
    onSuccess: (_, variables) => {
      sendConfirmationEmails({
        client_name: variables.client_name,
        email: variables.email,
        service_name: variables.service_name,
        date: variables.date,
        time: variables.time,
        price: chosenService?.price || 0,
        notes: variables.notes,
      }).catch(() => {}); // silent fail — booking is saved regardless
      setSubmitted(true);
    },
  });

  const chosenService = services.find((s) => s.id === selectedService);

  const disabledDays = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return isSunday(date) || isMonday(date) || isBefore(date, startOfToday()) || blockedSet.has(dateStr);
  };

  const takenSlots = new Set(
    bookingsOnDate.filter(b => b.status === "pending" || b.status === "confirmed").map(b => b.time)
  );

  const allSlots = selectedDate ? (selectedDate.getDay() === 6 ? SAT_SLOTS : TIME_SLOTS) : [];

  const handleSubmit = () => {
    createBooking.mutate({
      ...formData,
      service_id: selectedService,
      service_name: chosenService?.name || "",
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      status: "pending",
    });
  };

  if (submitted) {
    return <ConfirmationScreen formData={formData} chosenService={chosenService} selectedDate={selectedDate} selectedTime={selectedTime} />;
  }

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3">Appointments</p>
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Book Your <span className="italic font-light">Appointment</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose your service, pick a date and time, and fill in your details. You'll receive a confirmation email instantly.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}>{s}</div>
              {s < 3 && <div className={`w-12 h-0.5 transition-colors ${step > s ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Service */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="font-heading text-2xl font-semibold mb-6">Choose a Service</h3>
              {isLoading ? (
                <div className="space-y-3">{Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}</div>
              ) : (
                <div className="space-y-3">
                  {services.map((service) => (
                    <button key={service.id} onClick={() => { setSelectedService(service.id); setStep(2); }}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                        selectedService === service.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-heading text-lg font-semibold text-foreground">{service.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            {service.duration > 0 && <span className="flex items-center gap-1"><Clock size={13} /> {service.duration} mins</span>}
                            {service.description && <span className={service.duration > 0 ? "hidden sm:inline" : ""}>{service.duration > 0 ? "· " : ""}{service.description}</span>}
                          </div>
                        </div>
                        <p className="font-heading text-xl font-semibold text-foreground flex-shrink-0 ml-4">
                          {service.price === 0 ? "Free" : `£${service.price}`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={14} /> Change service
              </button>
              <h3 className="font-heading text-2xl font-semibold mb-6">Pick a Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-xl p-4 flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => { setSelectedDate(date); setSelectedTime(""); }}
                    disabled={disabledDays}
                    fromDate={new Date()}
                    toDate={addDays(new Date(), 60)}
                    className="font-body"
                  />
                </div>
                <div>
                  {selectedDate ? (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <CalendarDays size={14} />{format(selectedDate, "EEEE, d MMMM")}
                        </p>
                        {checkingAvailability && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <RefreshCw size={11} className="animate-spin" /> Checking…
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {allSlots.map((slot) => {
                          const taken = takenSlots.has(slot);
                          return (
                            <button key={slot} onClick={() => !taken && setSelectedTime(slot)} disabled={taken}
                              className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                                taken ? "bg-muted text-muted-foreground/40 cursor-not-allowed line-through"
                                : selectedTime === slot ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                              }`}>{slot}</button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      Select a date to view available times
                    </div>
                  )}
                </div>
              </div>
              {selectedDate && selectedTime && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex justify-end">
                  <Button onClick={() => setStep(3)} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">Continue</Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={14} /> Change date & time
              </button>
              <h3 className="font-heading text-2xl font-semibold mb-6">Your Details</h3>

              {/* Summary */}
              <div className="bg-accent/20 border border-border rounded-xl p-5 mb-8">
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div><span className="text-muted-foreground">Service: </span><span className="font-medium">{chosenService?.name}</span></div>
                  <div><span className="text-muted-foreground">Date: </span><span className="font-medium">{format(selectedDate, "d MMM yyyy")}</span></div>
                  <div><span className="text-muted-foreground">Time: </span><span className="font-medium">{selectedTime}</span></div>
                  {chosenService?.price > 0 && <div><span className="text-muted-foreground">Price: </span><span className="font-medium">£{chosenService?.price}</span></div>}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm mb-1.5 block">Full Name *</Label>
                  <Input id="name" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} placeholder="Your full name" className="rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="email" className="text-sm mb-1.5 block">Email *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="rounded-lg" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm mb-1.5 block">Phone *</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="07xxx xxxxxx" className="rounded-lg" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-sm mb-1.5 block">Notes (optional)</Label>
                  <Textarea id="notes" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Hair length, inspiration, anything we should know…" className="rounded-lg h-24" />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button onClick={handleSubmit}
                  disabled={!formData.client_name || !formData.email || !formData.phone || createBooking.isPending}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-3">
                  {createBooking.isPending ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ConfirmationScreen({ formData, chosenService, selectedDate, selectedTime }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-24 px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-primary" size={32} />
        </div>
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you, {formData.client_name}. A confirmation email has been sent to <span className="text-foreground font-medium">{formData.email}</span>.
        </p>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Booking Summary</p>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{chosenService?.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{format(selectedDate, "EEEE, d MMMM yyyy")}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selectedTime}</span></div>
            {chosenService?.price > 0 && (
              <div className="flex justify-between border-t border-border pt-2.5 mt-2.5">
                <span className="text-muted-foreground">Price</span>
                <span className="font-heading text-lg font-semibold text-foreground">£{chosenService?.price}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
