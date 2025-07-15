import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

// Fill these with your actual values!
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_RESUME_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_SITE_KEY = import.meta.env.RECAPTCHA_SITE_KEY;

const RESUME_URL = "/Shahi__Shreshth_.pdf"; // Place your resume.pdf in public/

export const Resume: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const recaptchaRef = useRef<any>(null);

  // Simple validation
  const validate = () => {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      errs.email = "Invalid email address";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone is required";
    } else if (!/^[\d +()-]{8,}$/.test(form.phone)) {
      errs.phone = "Invalid phone number";
    }
    if (!captchaValid) errs.captcha = "Captcha required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
    setCaptchaValid(!!token);
    if (!token) setErrors((e) => ({ ...e, captcha: "Captcha required" }));
    else setErrors((e) => {
      const { captcha, ...rest } = e;
      return rest;
    });
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSuccessMsg("");

    // Send form data with EmailJS
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          "g-recaptcha-response": captchaToken,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSuccessMsg("Submitted successfully! Your resume will download now.");
      // Download PDF
      const link = document.createElement("a");
      link.href = RESUME_URL;
      link.download = "Shahi_Shreshth_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowForm(false);
      setForm({ name: "", email: "", phone: "" });
      recaptchaRef.current?.reset();
      setCaptchaValid(false);
      setCaptchaToken(null);
    } catch (error) {
      setErrors({ emailjs: "Failed to send. Try again later." });
    }
    setSending(false);
  };

  return (
    <section id="resume" className="max-w-4xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        My Live Resume
      </h2>
      <div className="bg-slate-800 rounded-xl shadow-lg mb-8 overflow-hidden">
        <iframe
          src={RESUME_URL}
          title="Resume PDF"
          width="100%"
          height="700px"
          className="w-full"
          style={{
            minHeight: "600px",
            border: "none",
            background: "#222"
          }}
        />
      </div>
      <div className="text-center mb-8">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all"
          onClick={() => setShowForm(true)}
        >
          Download Resume
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-slate-900 p-8 rounded-xl max-w-md w-full shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowForm(false)}
            >✕</button>
            <h3 className="text-xl font-bold text-white mb-4">
              Enter Details to Download
            </h3>
            <form onSubmit={handleDownload} className="space-y-5">
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInput}
                  className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-purple-500"
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleInput}
                  className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-purple-500"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleInput}
                  className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:border-purple-500"
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleCaptcha}
                  ref={recaptchaRef}
                  theme="dark"
                />
                {errors.captcha && (
                  <p className="text-red-500 text-xs mt-2">{errors.captcha}</p>
                )}
              </div>
              {errors.emailjs && (
                <p className="text-red-500 text-xs mt-2">{errors.emailjs}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-all shadow hover:scale-105"
                disabled={sending}
              >
                {sending ? "Submitting..." : "Download PDF"}
              </button>
              {successMsg && <p className="text-green-500 text-xs mt-2">{successMsg}</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
