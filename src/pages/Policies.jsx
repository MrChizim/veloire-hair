import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Clock, CreditCard, Package, AlertCircle, CheckCircle } from "lucide-react";

const REVAMP_POLICY = [
  {
    icon: Clock,
    title: "Turnaround Time",
    points: [
      "Standard: 7–14 working days from confirmed payment",
      "Express 72-hour: +£20 (working days only)",
      "Express 48-hour: +£25 (including weekends)",
      "Time frame begins once payment is confirmed — not when the wig is received",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment",
    points: [
      "Full payment is required upfront before work begins",
      "Payment confirms your slot in the queue",
      "Accepted: bank transfer or agreed payment methods",
    ],
  },
  {
    icon: Package,
    title: "Sending & Collection",
    points: [
      "Send your wig securely packaged — we are not responsible for items lost in transit",
      "Include your name and contact details inside the parcel",
      "Return postage is included in the service price",
      "Collection in person is available by arrangement",
    ],
  },
  {
    icon: AlertCircle,
    title: "Important Notes",
    points: [
      "Heavily damaged or matted wigs may incur additional charges — you'll be informed before work proceeds",
      "We reserve the right to refuse wigs in unsanitary condition",
      "No refunds once work has begun",
    ],
  },
];

const CUSTOM_POLICY = [
  {
    icon: CreditCard,
    title: "Orders & Payment",
    points: [
      "A non-refundable deposit is required to secure your order",
      "Remaining balance is due before the wig is dispatched",
      "Custom wigs are made to your exact specifications — please double-check all details before confirming",
    ],
  },
  {
    icon: Clock,
    title: "Production Time",
    points: [
      "Custom builds typically take 2–4 weeks depending on complexity and current queue",
      "You will be kept updated throughout the process",
      "Timelines may vary during busy periods",
    ],
  },
  {
    icon: AlertCircle,
    title: "No Refunds",
    points: [
      "All custom wig orders are final — no refunds or exchanges",
      "If there is a genuine error on our part, we will work to resolve it",
      "Please review your order carefully before payment",
    ],
  },
  {
    icon: CheckCircle,
    title: "Quality Guarantee",
    points: [
      "Every wig is made with 100% human hair (or stated blend) to the agreed specification",
      "We stand behind the quality of our work",
      "Any concerns must be raised within 48 hours of receiving your wig",
    ],
  },
];

function PolicySection({ title, subtitle, items, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase mb-4 ${accent}`}>
        {subtitle}
      </div>
      <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-10">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <item.icon size={16} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-1 flex-shrink-0 text-xs">—</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Policies() {
  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.25em] uppercase mb-3 font-body">Please Read</p>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-4">
            Our <span className="italic font-light">Policies</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            To ensure a smooth experience for everyone, please read the relevant policy before booking.
          </p>
        </motion.div>

        {/* Revamp Policy */}
        <PolicySection
          title="Wig Revamping Policy"
          subtitle="Revamps & Repairs"
          accent="bg-primary/10 text-primary border border-primary/20"
          items={REVAMP_POLICY}
        />

        <div className="border-t border-border my-12" />

        {/* Custom Wig Policy */}
        <PolicySection
          title="Custom Wig Policy"
          subtitle="Custom Builds"
          accent="bg-primary/10 text-primary border border-primary/20"
          items={CUSTOM_POLICY}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6 bg-card border border-border rounded-2xl p-10"
        >
          <h3 className="font-heading text-2xl font-semibold mb-3">Ready to book?</h3>
          <p className="text-muted-foreground mb-6 text-sm max-w-sm mx-auto">
            Now that you've read our policies, let's get your appointment sorted.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={createPageUrl("BookAppointment")}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-all group"
            >
              Book Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={createPageUrl("Services")}
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-3 rounded-full text-sm font-medium hover:border-primary/40 transition-all"
            >
              View Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
