export const metadata = {
  title: 'Privacy Policy — After 9 Bar & Kitchen',
}

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section
        className="py-20 px-6"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs uppercase mb-4"
            style={{ color: 'var(--gold)', letterSpacing: '0.3em' }}
          >
            Legal
          </p>
          <h1
            className="font-display font-light text-foreground mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Privacy Policy
          </h1>
          <p className="text-text-muted text-sm">Last updated: May 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto" style={{ lineHeight: '1.8' }}>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Introduction
            </h2>
            <p className="text-text-muted text-sm">
              Welcome to After 9 Bar &amp; Kitchen. We value your privacy and are committed
              to protecting your personal data. This privacy policy explains how we
              collect, use, disclose, and safeguard your information when you visit our
              website www.after9bar-newcastle.co.uk, use our services, or interact with
              us in any other way.
            </p>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-6"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Information We Collect
            </h2>

            <h3
              className="text-foreground text-sm font-medium uppercase mb-3"
              style={{ letterSpacing: '0.1em', color: 'var(--gold)' }}
            >
              Personal Information
            </h3>
            <p className="text-text-muted text-sm mb-4">
              We may collect the following personal information from you:
            </p>
            <ul className="text-text-muted text-sm flex flex-col gap-2 mb-8 ml-4">
              {[
                'Contact Information: Name, email address, phone number, and mailing address.',
                'Payment Information: Credit card details, billing address, and other payment information.',
                'Reservation Details: Date and time of your reservation, number of guests, special requests.',
                'Account Information: Username, password, and preferences if you create an account.',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3
              className="text-foreground text-sm font-medium uppercase mb-3"
              style={{ letterSpacing: '0.1em', color: 'var(--gold)' }}
            >
              Non-Personal Information
            </h3>
            <p className="text-text-muted text-sm mb-4">
              We may collect non-personal information about you, including:
            </p>
            <ul className="text-text-muted text-sm flex flex-col gap-2 ml-4">
              {[
                'Device Information: IP address, browser type, operating system, device type.',
                'Usage Data: Pages visited, time spent on pages, clickstream data, and other analytical data.',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              How We Use Your Information
            </h2>
            <p className="text-text-muted text-sm mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="text-text-muted text-sm flex flex-col gap-2 ml-4">
              {[
                'Providing Services: To process reservations, orders, and payments.',
                'Communication: To send you updates, promotional materials, and respond to inquiries.',
                'Improvement: To improve our website, services, and customer experience.',
                'Security: To protect our website and services from fraud and misuse.',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Sharing Your Information
            </h2>
            <p className="text-text-muted text-sm mb-4">
              We do not sell, trade, or otherwise transfer your personal information to
              outside parties except in the following circumstances:
            </p>
            <ul className="text-text-muted text-sm flex flex-col gap-2 ml-4">
              {[
                'Service Providers: We may share your information with third-party service providers who assist us in operating our website, conducting our business, or servicing you.',
                'Legal Requirements: We may disclose your information if required by law or to protect our rights, property, or safety.',
                'Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Cookies and Tracking Technologies
            </h2>
            <p className="text-text-muted text-sm">
              Our website uses cookies and similar tracking technologies to enhance your
              experience. Cookies are small files that a site or its service provider
              transfers to your computer&apos;s hard drive through your web browser (if you allow)
              that enables the site&apos;s systems to recognize your browser and capture and
              remember certain information. You can choose to disable cookies through your
              individual browser options.
            </p>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Data Security
            </h2>
            <p className="text-text-muted text-sm">
              We implement appropriate technical and organisational measures to protect your
              personal information against unauthorised access, alteration, disclosure, or
              destruction. However, please note that no method of transmission over the
              internet, or method of electronic storage, is 100% secure.
            </p>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Your Rights
            </h2>
            <p className="text-text-muted text-sm mb-4">
              Under UK GDPR, you have the right to:
            </p>
            <ul className="text-text-muted text-sm flex flex-col gap-2 ml-4">
              {[
                'Access the personal information we hold about you.',
                'Request correction of incorrect or incomplete data.',
                'Request deletion of your personal information.',
                'Object to the processing of your personal information.',
                'Request restriction of processing your personal information.',
                'Withdraw consent at any time, where we are relying on consent to process your personal information.',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Changes to This Privacy Policy
            </h2>
            <p className="text-text-muted text-sm">
              We may update this privacy policy from time to time. Any changes will be
              posted on this page with an updated revision date. We encourage you to
              review this policy periodically.
            </p>
          </div>

          <div className="mb-10">
            <h2
              className="font-display font-light text-foreground mb-4"
              style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}
            >
              Contact Us
            </h2>
            <p className="text-text-muted text-sm mb-4">
              If you have any questions or concerns about this privacy policy, please contact us at:
            </p>
            <ul className="text-text-muted text-sm flex flex-col gap-2 ml-4">
              <li className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>Email: <a href="mailto:Jiuhou2023@gmail.com" className="hover:text-foreground transition-colors" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Jiuhou2023@gmail.com</a></span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>Phone: <a href="tel:07552791612" className="hover:text-foreground transition-colors">07552 791612</a></span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>WhatsApp: <a href="https://wa.me/447552791612" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">07552 791612</a></span>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>Address: 45-51 Stowell Street, Newcastle upon Tyne, NE1 4YB</span>
              </li>
            </ul>
          </div>

          <div
            className="pt-8 mt-8 text-text-muted text-sm italic"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            By using our website, you consent to our privacy policy. Thank you for
            choosing After 9 Bar &amp; Kitchen, where your privacy is as important to us
            as your dining experience.
          </div>

        </div>
      </section>
    </div>
  )
}
