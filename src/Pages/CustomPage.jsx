import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const CustomPage = ({ pageType }) => {
  const { t } = useTranslation();
  const privacyPolicy = t('Privacy Policy');
  const termsConditions = t('Terms & Conditions');
  // State for page data
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get page type from props or URL params
  const { type } = useParams();
  const contentType = pageType || type;

  // Fetch page data
  useEffect(() => {
    // In a real app, you would fetch data from an API
    // For this example, we'll use mock data based on the page type

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      let pageData;

      if (contentType === 'terms-conditions') {
        pageData = {
          translation: {
            name: termsConditions,
            content: `
        <h4>1. ${t("Acceptance of Terms")}</h4>
        <p>{t("By accessing and using Teachera's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.")}</p>
        
        <h4>2. {t("User Accounts")}</h4>
        <p>{t("When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account.")}</p>
        
        <h4>3. {t("Course Content")}</h4>
        <p>{t("All content provided on Teachera is for informational and educational purposes only. We make no warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information on our website is strictly at your own risk, and we will not be liable for any losses or damages in connection with the use of our website.")}</p>
        
        <h4>4. {t("Intellectual Property")}</h4>
        <p>{t("The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights. Copying, redistribution, use, or publication by you of any such content or any part of the Site is prohibited without express written permission from Teachera.")}</p>
        
        <h4>5. {t("Payment and Refunds")}</h4>
        <p>{t("All purchases are final and non-refundable unless otherwise specified in our refund policy. We reserve the right to refuse or cancel orders at any time.")}</p>
        
        <h4>6. {t("Limitation of Liability")}</h4>
        <p>{t("In no event shall Teachera, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.")}</p>
        
        <h4>7. {t("Changes to Terms")}</h4>
        <p>{t("We reserve the right to modify these terms at any time. We will always post the most current version on our website. By continuing to use the platform after changes become effective, you agree to be bound by the revised terms.")}</p>
        
        <h4>8. {t("Governing Law")}</h4>
        <p>{t("These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.")}</p>
      `
          }
        };
      } else if (contentType === 'privacy-policy') {
        pageData = {
          translation: {
            name: privacyPolicy,
            content: `
        <h4>1. ${t("Information We Collect")}</h4>
        <p> ${t("We collect information you provide directly to us when you create an account, enroll in a course, participate in forums, or communicate with us. This may include your name, email address, payment information, and any other information you choose to provide.How We Use Your InformationWe use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and for other legitimate business purposes.")}</p>
        
        <h4>2. ${t("How We Use Your Information")}</h4>
        <p> ${t("We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and for other legitimate business purposes.")}</p>
        
        <h4>3. ${t("Information Sharing")}</h4>
        <p> ${t("We do not share your personal information with third parties except as described in this privacy policy. We may share your information with service providers who perform services on our behalf, when required by law, or in connection with a merger, acquisition, or sale of assets.")}</p>
        
        <h4>4. ${t("Data Security")}</h4>
        <p> ${t("We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.")}</p>
        
        <h4>5. ${t("Cookies")}</h4>
        <p> ${t("We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our website. This helps us provide you with a good experience when you browse our website and also allows us to improve our site.")}</p>

       <h4>5. ${t("Contact Us")}</h4>
<p>${t("If you have any questions or concerns about this Privacy Policy, contact us at:")}</p>

<blockquote>
  <p>Website: <a href="https://new.basementex.com" target="_blank" rel="noopener noreferrer">new.basementex.com</a></p>
  <p>Email: <a href="mailto:team@basementex.com">team@basementex.com</a></p>
  <p>Phone: +96181769044</p>
</blockquote>

      `
          }
        };
      } else {
        pageData = {
          translation: {
            name: 'Content Page',
            content: '<p>{t("Content not found.")}</p>'
          }
        };
      }
      setPage(pageData);
      setLoading(false);
    }, 500);
  }, [contentType]);

  if (loading) {
    return (
      <section className="content-sec tp-space mt-85">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading content...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-sec tp-space mt-85">
      <div className="container">
        <h3 className="title">{page?.translation?.name}</h3>
        <div dangerouslySetInnerHTML={{ __html: page?.translation?.content }} />
      </div>
    </section>
  );
};

export default CustomPage;