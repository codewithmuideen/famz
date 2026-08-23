import { useState } from "react";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import Button from "../components/common/Button";
import { siteConfig } from "../constants/siteConfig";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please select a subject.";
  if (!values.message.trim()) {
    errors.message = "Tell us a little about your enquiry.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Please provide a few more details (min. 20 characters).";
  }
  return errors;
}

function Field({ label, name, type = "text", value, onChange, error, textarea, options }) {
  const inputClasses = `w-full border bg-surface-white px-4 py-3 text-sm outline-none transition-colors ${
    error ? "border-red-400 focus:border-red-500" : "border-line focus:border-brand-navy"
  }`;

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={inputClasses}
        />
      ) : options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={inputClasses}
        >
          <option value="">Select a subject</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={inputClasses}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((err) => ({ ...err, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Dieux Accounting & Advisory. Send us an enquiry about accounting, tax or business advisory support."
        path="/contact"
        breadcrumbs={[{ name: "Contact", url: "/contact" }]}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your finances and your future"
        description="Whether you need support with compliance or a strategic finance partner to help you grow, our team is here to help."
        image="contact-office"
        breadcrumbItems={[{ label: "Contact" }]}
      />

      <section className="bg-surface-white py-20 sm:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="mb-4 text-xl text-ink">Get in touch directly</h2>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-3 text-sm text-ink-muted transition-colors hover:text-brand-navy"
                >
                  <Mail size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  {siteConfig.contact.email}
                </a>
                <div className="flex items-start gap-3 text-sm text-ink-muted">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                  <span>
                    {siteConfig.contact.addressLine1}
                    <br />
                    {siteConfig.contact.addressLine2}
                  </span>
                </div>
              </div>
            </div>
            <div className="border border-line bg-surface-cream p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">
                Regulation
              </span>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {siteConfig.regulator.name}. {siteConfig.name} is a regulated firm — registration
                details available on request for verification purposes.
              </p>
            </div>
          </div>

          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start gap-4 border border-line bg-surface-cream p-10"
              >
                <CheckCircle2 size={36} className="text-brand-gold" />
                <h2 className="text-2xl text-ink">Thank you — your message is on its way</h2>
                <p className="text-ink-muted">
                  A member of our team will get back to you at {values.email} shortly.
                </p>
                <Button
                  variant="outline"
                  icon={false}
                  onClick={() => {
                    setValues(initialValues);
                    setSubmitted(false);
                  }}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="First name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  <Field
                    label="Last name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  <Field
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  <Field
                    label="Company (optional)"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                  />
                  <Field
                    label="Subject"
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    options={[
                      "Services for Individuals",
                      "Accounting & Compliance",
                      "Tax Services",
                      "Business Advisory",
                      "Finance & Consultancy",
                      "Specialist Services",
                      "Careers",
                      "General Enquiry",
                    ]}
                  />
                </div>
                <Field
                  label="Message"
                  name="message"
                  textarea
                  value={values.message}
                  onChange={handleChange}
                  error={errors.message}
                />
                <Button type="submit" variant="primary" size="lg" className="w-fit">
                  Send message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
