import Split from "../Split";
import ContactForm from "../ContactForm";
import { contact } from "@/content/site";

export default function Contact() {
  return (
    <section className="contact section--dark" id="contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="wrap">
        <p className="label"><span className="label__n">(06)</span> Contact</p>
        <h2 id="contact-title" className="contact__title"><Split text="Have a story to tell?" italic={["story"]} /></h2>

        <div className="contact__grid">
          <div className="contact__details">
            <p className="contact__intro" data-reveal="up">For films, documentaries, writing, photography or content strategy — Reda would love to hear from you.</p>
            <dl className="contact__list" data-reveal="stagger">
              <div><dt className="label">Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
              <div><dt className="label">Phone</dt><dd><a href={contact.phoneHref}>{contact.phoneDisplay}</a></dd></div>
              <div><dt className="label">LinkedIn</dt><dd><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">Reda Fatima Mobin <span aria-hidden="true">↗</span><span className="sr-only">(opens in a new tab)</span></a></dd></div>
              <div><dt className="label">Instagram</dt><dd><a href={contact.instagram} target="_blank" rel="noopener noreferrer">{contact.instagramHandle} <span aria-hidden="true">↗</span><span className="sr-only">(opens in a new tab)</span></a></dd></div>
            </dl>
          </div>
          <div data-reveal="up" data-delay="0.1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
