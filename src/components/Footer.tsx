import Link from "next/link";
import { contact, site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__concept">{site.concept}</p>
        <div className="footer__cols">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <ul>
            <li><a href={`mailto:${contact.email}`}>Email</a></li>
            <li><a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
          <Link href="/#top" className="footer__top">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
