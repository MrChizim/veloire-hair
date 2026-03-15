import { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Clock, ArrowLeft, CalendarDays, RefreshCw } from "lucide-react";
import { format, addDays, isSunday, isMonday, isBefore, startOfToday, parseISO } from "date-fns";

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
    onSuccess: () => {
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
            Choose your service, pick a date and time, and fill in your details. We'll confirm via WhatsApp.
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
  const waMessage = encodeURIComponent(
    `Hi Véloire Hair! 👋\n\nI've just submitted a booking request:\n\n` +
    `Name: ${formData.client_name}\n` +
    `Service: ${chosenService?.name || ""}\n` +
    `Date: ${format(selectedDate, "EEEE, d MMMM yyyy")}\n` +
    `Time: ${selectedTime}\n` +
    (chosenService?.price > 0 ? `Price: £${chosenService.price}\n` : "") +
    (formData.notes ? `Notes: ${formData.notes}\n` : "") +
    `\nCould you please confirm? Thank you!`
  );
  const waUrl = `https://wa.me/447404335619?text=${waMessage}`;

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-24 px-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-primary" size={32} />
        </div>
        <h2 className="font-heading text-3xl font-semibold text-foreground mb-2">Booking Submitted!</h2>
        <p className="text-muted-foreground mb-6">Thank you, {formData.client_name}. Your slot has been reserved — tap below to confirm on WhatsApp.</p>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6 text-left">
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

        {/* What happens next */}
        <div className="bg-card border border-border rounded-xl p-5 mb-6 text-left">
          <p className="text-sm font-semibold text-foreground mb-3">What happens next?</p>
          <ol className="space-y-3">
            {[
              "Tap the button below — WhatsApp will open with your booking details pre-filled.",
              "Send the message to Véloire Hair.",
              "You'll receive a confirmation reply on WhatsApp.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="flex-shrink-0 w-5 h-5 bg-primary/15 text-primary border border-primary/25 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-colors w-full mb-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Confirm on WhatsApp
        </a>
        <a
          href={`mailto:${formData.email}?subject=${encodeURIComponent("Your Véloire Hair Booking")}&body=${encodeURIComponent(
            `Hi ${formData.client_name},\n\nYour booking request has been submitted. Here's your summary:\n\nService: ${chosenService?.name || ""}\nDate: ${format(selectedDate, "EEEE, d MMMM yyyy")}\nTime: ${selectedTime}\n${chosenService?.price > 0 ? `Price: £${chosenService.price}\n` : ""}${formData.notes ? `Notes: ${formData.notes}\n` : ""}\nVéloire Hair will confirm your appointment via WhatsApp shortly.\n\nThank you!\nVéloire Hair`
          )}`}
          className="inline-flex items-center justify-center gap-2 bg-card border border-border hover:border-primary/30 text-foreground px-8 py-3.5 rounded-full text-sm font-medium transition-colors w-full mb-3"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Email Confirmation to Myself
        </a>
        <p className="text-xs text-muted-foreground">Opens your email app with the summary ready to send</p>
      </motion.div>
    </div>
  );
}
