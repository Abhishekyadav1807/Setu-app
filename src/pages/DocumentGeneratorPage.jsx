import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import jsPDF from 'jspdf';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const docTemplates = [
  {
    id: 'fir-draft',
    title: 'FIR Draft',
    icon: '',
    desc: 'Draft a First Information Report complaint letter for the police station',
    fields: [
      { name: 'complainant_name', label: 'Complainant Name', type: 'text', placeholder: 'Enter your full name', required: true },
      { name: 'complainant_address', label: 'Complainant Address', type: 'textarea', placeholder: 'Enter your complete address' },
      { name: 'father_name', label: 'Father/Husband Name', type: 'text', placeholder: 'Enter father/husband name' },
      { name: 'police_station', label: 'Police Station Name', type: 'text', placeholder: 'Enter police station name' },
      { name: 'incident_date', label: 'Date of Incident', type: 'date', required: true },
      { name: 'incident_time', label: 'Time of Incident', type: 'text', placeholder: 'e.g., 3:30 PM' },
      { name: 'incident_location', label: 'Place of Incident', type: 'text', placeholder: 'Exact location where incident occurred', required: true },
      { name: 'description', label: 'Description of Incident', type: 'textarea', placeholder: 'Describe what happened in detail...', required: true },
      { name: 'accused_details', label: 'Accused Person Details', type: 'textarea', placeholder: 'Name, address, physical description of accused (if known)' },
      { name: 'witnesses', label: 'Witness Details', type: 'textarea', placeholder: 'Names and contact details of witnesses (if any)' },
      { name: 'stolen_property', label: 'Property Lost/Stolen (if applicable)', type: 'textarea', placeholder: 'Description and estimated value of items' },
    ],
  },
  {
    id: 'rti-application',
    title: 'RTI Application',
    icon: '',
    desc: 'Right to Information application to seek information from government departments',
    fields: [
      { name: 'applicant_name', label: 'Applicant Name', type: 'text', required: true },
      { name: 'applicant_address', label: 'Applicant Address', type: 'textarea', required: true },
      { name: 'applicant_phone', label: 'Phone Number', type: 'text' },
      { name: 'applicant_email', label: 'Email Address', type: 'text' },
      { name: 'department', label: 'Department/Public Authority Name', type: 'text', placeholder: 'Name of the government department', required: true },
      { name: 'pio_designation', label: 'PIO Designation (if known)', type: 'text', placeholder: 'Public Information Officer designation' },
      { name: 'questions', label: 'Information Sought', type: 'textarea', placeholder: 'List specific questions/information you are seeking...', required: true },
      { name: 'period', label: 'Time Period of Information', type: 'text', placeholder: 'e.g., January 2024 to December 2024' },
      { name: 'fee_mode', label: 'Fee Payment Mode', type: 'text', placeholder: 'e.g., Indian Postal Order / DD / Cash' },
    ],
  },
  {
    id: 'legal-notice',
    title: 'Legal Notice',
    icon: '',
    desc: 'Formal legal notice to be sent via registered post to the opposite party',
    fields: [
      { name: 'sender_name', label: 'Sender (Your Name)', type: 'text', required: true },
      { name: 'sender_address', label: 'Sender Address', type: 'textarea', required: true },
      { name: 'sender_phone', label: 'Sender Phone', type: 'text' },
      { name: 'recipient_name', label: 'Recipient Name', type: 'text', required: true },
      { name: 'recipient_address', label: 'Recipient Address', type: 'textarea', required: true },
      { name: 'subject', label: 'Subject of Notice', type: 'text', placeholder: 'e.g., Notice for recovery of dues', required: true },
      { name: 'background', label: 'Background/Facts', type: 'textarea', placeholder: 'Describe the facts and background of the dispute...', required: true },
      { name: 'grievance', label: 'Grievance/Complaint', type: 'textarea', placeholder: 'Describe your specific grievance...', required: true },
      { name: 'relief_sought', label: 'Relief/Action Demanded', type: 'textarea', placeholder: 'What action do you want the recipient to take...', required: true },
      { name: 'deadline_days', label: 'Response Deadline (days)', type: 'text', placeholder: 'e.g., 15 days' },
    ],
  },
  {
    id: 'consumer-complaint',
    title: 'Consumer Complaint',
    icon: '',
    desc: 'Consumer forum complaint against defective goods or deficient services',
    fields: [
      { name: 'complainant_name', label: 'Complainant Name', type: 'text', required: true },
      { name: 'complainant_address', label: 'Complainant Address', type: 'textarea', required: true },
      { name: 'complainant_phone', label: 'Phone Number', type: 'text' },
      { name: 'opposite_party', label: 'Opposite Party (Company/Seller)', type: 'text', required: true },
      { name: 'opposite_address', label: 'Opposite Party Address', type: 'textarea' },
      { name: 'product_service', label: 'Product/Service Details', type: 'text', placeholder: 'Name and description of product/service', required: true },
      { name: 'purchase_date', label: 'Date of Purchase', type: 'date' },
      { name: 'purchase_amount', label: 'Amount Paid (â‚¹)', type: 'text' },
      { name: 'invoice_no', label: 'Invoice/Bill Number', type: 'text' },
      { name: 'deficiency', label: 'Nature of Defect/Deficiency', type: 'textarea', placeholder: 'Describe the defect or deficiency in detail...', required: true },
      { name: 'previous_complaints', label: 'Previous Complaints Made', type: 'textarea', placeholder: 'Details of complaints made to seller/company...' },
      { name: 'compensation', label: 'Compensation Claimed (â‚¹)', type: 'text', placeholder: 'Total compensation amount sought' },
    ],
  },
  {
    id: 'rent-notice',
    title: 'Rent Notice',
    icon: '',
    desc: 'Notice to tenant or landlord regarding rent-related matters',
    fields: [
      { name: 'sender_name', label: 'Sender Name (Landlord/Tenant)', type: 'text', required: true },
      { name: 'sender_address', label: 'Sender Address', type: 'textarea', required: true },
      { name: 'recipient_name', label: 'Recipient Name', type: 'text', required: true },
      { name: 'recipient_address', label: 'Recipient Address', type: 'textarea', required: true },
      { name: 'property_address', label: 'Rental Property Address', type: 'textarea', placeholder: 'Complete address of the rented property', required: true },
      { name: 'rent_amount', label: 'Monthly Rent Amount (â‚¹)', type: 'text', required: true },
      { name: 'agreement_date', label: 'Rent Agreement Date', type: 'date' },
      { name: 'notice_reason', label: 'Reason for Notice', type: 'textarea', placeholder: 'e.g., Non-payment of rent, eviction notice, deposit refund...', required: true },
      { name: 'pending_amount', label: 'Pending Amount (if any) (â‚¹)', type: 'text' },
      { name: 'deadline_days', label: 'Compliance Deadline (days)', type: 'text', placeholder: 'e.g., 30 days' },
    ],
  },
];

function generatePDF(template, formData) {
  const doc = new jsPDF();
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  let y = 20;
  const leftMargin = 20;
  const pageWidth = 170;

  const addText = (text, options = {}) => {
    const { size = 11, style = 'normal', align = 'left', color = [0, 0, 0] } = options;
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, pageWidth);
    lines.forEach(line => {
      if (y > 270) { doc.addPage(); y = 20; }
      if (align === 'center') doc.text(line, 105, y, { align: 'center' });
      else if (align === 'right') doc.text(line, 190, y, { align: 'right' });
      else doc.text(line, leftMargin, y);
      y += size * 0.5;
    });
    y += 2;
  };

  const addLine = () => {
    doc.setDrawColor(200, 200, 200);
    doc.line(leftMargin, y, 190, y);
    y += 6;
  };

  // Header
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(1.5);
  doc.line(leftMargin, 15, 190, 15);

  switch (template.id) {
    case 'fir-draft': {
      addText('FIRST INFORMATION REPORT (FIR) DRAFT', { size: 16, style: 'bold', align: 'center' });
      addText('(Under Section 173 of Bharatiya Nagarik Suraksha Sanhita, 2023)', { size: 9, align: 'center', color: [100, 100, 100] });
      y += 6;
      addLine();
      addText(`Date: ${today}`, { size: 10, align: 'right' });
      y += 2;
      addText(`To,`, { size: 11 });
      addText(`The Station House Officer (SHO),`, { size: 11 });
      addText(`${formData.police_station || '[Police Station Name]'},`, { size: 11 });
      y += 4;
      addText(`Subject: FIR Complaint regarding incident on ${formData.incident_date || '[Date]'}`, { size: 11, style: 'bold' });
      y += 4;
      addText(`Respected Sir/Madam,`, { size: 11 });
      y += 2;
      addText(`I, ${formData.complainant_name || '[Complainant Name]'}, ${formData.father_name ? `S/o, D/o, W/o ${formData.father_name}` : ''}, residing at ${formData.complainant_address || '[Address]'}, do hereby lodge the following complaint for your kind consideration and necessary action:`, { size: 11 });
      y += 4;
      addText('DETAILS OF INCIDENT:', { size: 11, style: 'bold' });
      addText(`Date: ${formData.incident_date || '[Not specified]'}`, { size: 11 });
      addText(`Time: ${formData.incident_time || '[Not specified]'}`, { size: 11 });
      addText(`Place: ${formData.incident_location || '[Not specified]'}`, { size: 11 });
      y += 2;
      addText('DESCRIPTION:', { size: 11, style: 'bold' });
      addText(formData.description || '[Description of incident]', { size: 11 });
      y += 2;
      if (formData.accused_details) {
        addText('ACCUSED DETAILS:', { size: 11, style: 'bold' });
        addText(formData.accused_details, { size: 11 });
        y += 2;
      }
      if (formData.witnesses) {
        addText('WITNESSES:', { size: 11, style: 'bold' });
        addText(formData.witnesses, { size: 11 });
        y += 2;
      }
      if (formData.stolen_property) {
        addText('PROPERTY LOST/STOLEN:', { size: 11, style: 'bold' });
        addText(formData.stolen_property, { size: 11 });
        y += 2;
      }
      y += 6;
      addText('I request you to kindly register the FIR and take necessary action as per law.', { size: 11 });
      y += 10;
      addText('Yours faithfully,', { size: 11 });
      y += 8;
      addText(`${formData.complainant_name || '[Name]'}`, { size: 11, style: 'bold' });
      addText(`${formData.complainant_address || '[Address]'}`, { size: 10 });
      break;
    }

    case 'rti-application': {
      addText('APPLICATION UNDER RIGHT TO INFORMATION ACT, 2005', { size: 14, style: 'bold', align: 'center' });
      addText('(Under Section 6(1) of the RTI Act, 2005)', { size: 9, align: 'center', color: [100, 100, 100] });
      y += 6;
      addLine();
      addText(`Date: ${today}`, { size: 10, align: 'right' });
      y += 2;
      addText('To,', { size: 11 });
      addText('The Public Information Officer (PIO),', { size: 11 });
      addText(`${formData.department || '[Department Name]'}`, { size: 11 });
      if (formData.pio_designation) addText(formData.pio_designation, { size: 11 });
      y += 4;
      addText('Subject: Application seeking information under RTI Act, 2005', { size: 11, style: 'bold' });
      y += 4;
      addText('Sir/Madam,', { size: 11 });
      y += 2;
      addText(`I, ${formData.applicant_name || '[Name]'}, an Indian citizen, am requesting the following information under the Right to Information Act, 2005:`, { size: 11 });
      y += 4;
      addText('INFORMATION SOUGHT:', { size: 11, style: 'bold' });
      addText(formData.questions || '[Specific information sought]', { size: 11 });
      y += 2;
      if (formData.period) {
        addText(`Period: ${formData.period}`, { size: 11 });
        y += 2;
      }
      addText(`Application Fee: â‚¹10 paid via ${formData.fee_mode || 'Indian Postal Order'}`, { size: 11 });
      y += 4;
      addText('I state that the information sought does not fall within the restrictions under Section 8 of the Act. Please provide the information within 30 days as prescribed under Section 7(1) of the RTI Act, 2005.', { size: 11 });
      y += 10;
      addText('Yours faithfully,', { size: 11 });
      y += 8;
      addText(`${formData.applicant_name || '[Name]'}`, { size: 11, style: 'bold' });
      addText(`${formData.applicant_address || '[Address]'}`, { size: 10 });
      if (formData.applicant_phone) addText(`Phone: ${formData.applicant_phone}`, { size: 10 });
      if (formData.applicant_email) addText(`Email: ${formData.applicant_email}`, { size: 10 });
      break;
    }

    case 'legal-notice': {
      addText('LEGAL NOTICE', { size: 18, style: 'bold', align: 'center' });
      addText('(Under Section 80 of the Code of Civil Procedure / General)', { size: 9, align: 'center', color: [100, 100, 100] });
      y += 6;
      addLine();
      addText(`Date: ${today}`, { size: 10, align: 'right' });
      y += 2;
      addText('NOTICE', { size: 14, style: 'bold', align: 'center' });
      y += 4;
      addText('To,', { size: 11 });
      addText(`${formData.recipient_name || '[Recipient Name]'}`, { size: 11, style: 'bold' });
      addText(`${formData.recipient_address || '[Recipient Address]'}`, { size: 11 });
      y += 4;
      addText('From,', { size: 11 });
      addText(`${formData.sender_name || '[Sender Name]'}`, { size: 11, style: 'bold' });
      addText(`${formData.sender_address || '[Sender Address]'}`, { size: 11 });
      y += 4;
      addText(`Subject: ${formData.subject || '[Subject]'}`, { size: 11, style: 'bold' });
      y += 4;
      addText('Sir/Madam,', { size: 11 });
      y += 2;
      addText('Under instructions from my client, I do hereby serve upon you this legal notice as follows:', { size: 11 });
      y += 4;
      addText('FACTS AND BACKGROUND:', { size: 11, style: 'bold' });
      addText(formData.background || '[Background details]', { size: 11 });
      y += 2;
      addText('GRIEVANCE:', { size: 11, style: 'bold' });
      addText(formData.grievance || '[Grievance details]', { size: 11 });
      y += 2;
      addText('DEMAND/RELIEF SOUGHT:', { size: 11, style: 'bold' });
      addText(formData.relief_sought || '[Relief demanded]', { size: 11 });
      y += 4;
      addText(`You are hereby called upon to comply with the above demands within ${formData.deadline_days || '15'} days of receipt of this notice, failing which I shall be constrained to initiate appropriate legal proceedings against you, at your risk, cost, and consequences.`, { size: 11 });
      y += 10;
      addText(`${formData.sender_name || '[Name]'}`, { size: 11, style: 'bold' });
      if (formData.sender_phone) addText(`Phone: ${formData.sender_phone}`, { size: 10 });
      break;
    }

    case 'consumer-complaint': {
      addText('CONSUMER COMPLAINT', { size: 16, style: 'bold', align: 'center' });
      addText('(Under Section 35 of the Consumer Protection Act, 2019)', { size: 9, align: 'center', color: [100, 100, 100] });
      y += 6;
      addLine();
      addText('BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL FORUM', { size: 11, style: 'bold', align: 'center' });
      y += 6;
      addText(`Complainant: ${formData.complainant_name || '[Name]'}`, { size: 11, style: 'bold' });
      addText(`Address: ${formData.complainant_address || '[Address]'}`, { size: 10 });
      if (formData.complainant_phone) addText(`Phone: ${formData.complainant_phone}`, { size: 10 });
      y += 4;
      addText('VERSUS', { size: 11, style: 'bold', align: 'center' });
      y += 4;
      addText(`Opposite Party: ${formData.opposite_party || '[Company Name]'}`, { size: 11, style: 'bold' });
      if (formData.opposite_address) addText(`Address: ${formData.opposite_address}`, { size: 10 });
      y += 4;
      addLine();
      addText('FACTS OF THE CASE:', { size: 11, style: 'bold' });
      addText(`Product/Service: ${formData.product_service || '[Not specified]'}`, { size: 11 });
      if (formData.purchase_date) addText(`Date of Purchase: ${formData.purchase_date}`, { size: 11 });
      if (formData.purchase_amount) addText(`Amount Paid: â‚¹${formData.purchase_amount}`, { size: 11 });
      if (formData.invoice_no) addText(`Invoice No: ${formData.invoice_no}`, { size: 11 });
      y += 4;
      addText('NATURE OF DEFECT/DEFICIENCY:', { size: 11, style: 'bold' });
      addText(formData.deficiency || '[Description of defect/deficiency]', { size: 11 });
      y += 2;
      if (formData.previous_complaints) {
        addText('PREVIOUS COMPLAINTS:', { size: 11, style: 'bold' });
        addText(formData.previous_complaints, { size: 11 });
        y += 2;
      }
      addText('PRAYER/RELIEF SOUGHT:', { size: 11, style: 'bold' });
      addText(`The complainant prays that this forum may direct the opposite party to:`, { size: 11 });
      addText(`1. Provide refund/replacement for the defective goods/deficient services`, { size: 11 });
      if (formData.compensation) addText(`2. Pay compensation of â‚¹${formData.compensation} for mental agony and harassment`, { size: 11 });
      addText(`3. Pay the cost of litigation`, { size: 11 });
      y += 10;
      addText(`${formData.complainant_name || '[Name]'}`, { size: 11, style: 'bold' });
      addText(`Date: ${today}`, { size: 10 });
      break;
    }

    case 'rent-notice': {
      addText('RENT NOTICE', { size: 16, style: 'bold', align: 'center' });
      addText('(Under the Model Tenancy Act, 2021 / State Rent Control Act)', { size: 9, align: 'center', color: [100, 100, 100] });
      y += 6;
      addLine();
      addText(`Date: ${today}`, { size: 10, align: 'right' });
      y += 2;
      addText('To,', { size: 11 });
      addText(`${formData.recipient_name || '[Recipient Name]'}`, { size: 11, style: 'bold' });
      addText(`${formData.recipient_address || '[Address]'}`, { size: 11 });
      y += 4;
      addText('From,', { size: 11 });
      addText(`${formData.sender_name || '[Sender Name]'}`, { size: 11, style: 'bold' });
      addText(`${formData.sender_address || '[Address]'}`, { size: 11 });
      y += 4;
      addText('Subject: Notice regarding rental property', { size: 11, style: 'bold' });
      y += 4;
      addText('Sir/Madam,', { size: 11 });
      y += 2;
      addText(`This notice is in reference to the rental property situated at: ${formData.property_address || '[Property Address]'}`, { size: 11 });
      y += 2;
      addText(`Monthly Rent: â‚¹${formData.rent_amount || '[Amount]'}`, { size: 11 });
      if (formData.agreement_date) addText(`Rent Agreement Date: ${formData.agreement_date}`, { size: 11 });
      y += 4;
      addText('REASON FOR NOTICE:', { size: 11, style: 'bold' });
      addText(formData.notice_reason || '[Reason for notice]', { size: 11 });
      y += 2;
      if (formData.pending_amount) {
        addText(`Pending Amount: â‚¹${formData.pending_amount}`, { size: 11, style: 'bold' });
        y += 2;
      }
      addText(`You are hereby required to comply with the above within ${formData.deadline_days || '30'} days of receipt of this notice, failing which appropriate legal action will be initiated as per the applicable Rent Control Act / Model Tenancy Act, 2021.`, { size: 11 });
      y += 10;
      addText(`${formData.sender_name || '[Name]'}`, { size: 11, style: 'bold' });
      break;
    }
  }

  // Footer
  y = 280;
  doc.setDrawColor(200, 200, 200);
  doc.line(leftMargin, y, 190, y);
  y += 4;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated by SETU - Legal Awareness & Document Assistance Platform | For educational purposes only', 105, y, { align: 'center' });

  return doc;
}

export default function DocumentGeneratorPage() {
  const { language } = useLanguage();
  const uiByLang = {
    en: {
      title: 'Legal Document Generator',
      desc: 'Generate formatted legal documents by filling simple forms. Preview the document and download as PDF.',
      disclaimerLabel: 'Disclaimer:',
      disclaimer: 'These documents are generated for informational and educational purposes only. Please consult a qualified lawyer before using any legal document in official proceedings.',
      selectType: 'Select Document Type',
      generate: 'Generate ->',
      backToTypes: '<- Back to Document Types',
      previewDoc: 'Preview Document',
      reset: 'Reset',
      backToForm: '<- Back to Form',
      preview: 'Preview',
      edit: 'Edit',
      saving: 'Saving...',
      download: 'Download PDF',
    },
    hi: {
      title: '\u0915\u093e\u0928\u0942\u0928\u0940 \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c\u093c \u091c\u0928\u0930\u0947\u091f\u0930',
      desc: '\u0938\u0930\u0932 \u092b\u0949\u0930\u094d\u092e \u092d\u0930\u0915\u0930 \u0915\u093e\u0928\u0942\u0928\u0940 \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c\u093c \u092c\u0928\u093e\u090f\u0902\u0964 \u092a\u094d\u0930\u0940\u0935\u094d\u092f\u0942 \u0926\u0947\u0916\u0947\u0902 \u0914\u0930 PDF \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u0947\u0902\u0964',
      disclaimerLabel: '\u0905\u0938\u094d\u0935\u0940\u0915\u0930\u0923:',
      disclaimer: '\u092f\u0947 \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c\u093c \u0915\u0947\u0935\u0932 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u0935 \u0936\u0948\u0915\u094d\u0937\u0923\u093f\u0915 \u0909\u0926\u094d\u0926\u0947\u0936\u094d\u092f \u0915\u0947 \u0932\u093f\u090f \u0939\u0948\u0902\u0964 \u0906\u0927\u093f\u0915\u093e\u0930\u093f\u0915 \u0909\u092a\u092f\u094b\u0917 \u0938\u0947 \u092a\u0939\u0932\u0947 \u092f\u094b\u0917\u094d\u092f \u0935\u0915\u0940\u0932 \u0938\u0947 \u0938\u0932\u093e\u0939 \u0932\u0947\u0902\u0964',
      selectType: '\u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c\u093c \u092a\u094d\u0930\u0915\u093e\u0930 \u091a\u0941\u0928\u0947\u0902',
      generate: '\u092c\u0928\u093e\u090f\u0902 ->',
      backToTypes: '<- \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c\u093c \u092a\u094d\u0930\u0915\u093e\u0930 \u092a\u0930 \u0935\u093e\u092a\u0938',
      previewDoc: '\u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c\u093c \u092a\u094d\u0930\u0940\u0935\u094d\u092f\u0942',
      reset: '\u0930\u0940\u0938\u0947\u091f',
      backToForm: '<- \u092b\u0949\u0930\u094d\u092e \u092a\u0930 \u0935\u093e\u092a\u0938',
      preview: '\u092a\u094d\u0930\u0940\u0935\u094d\u092f\u0942',
      edit: '\u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902',
      saving: '\u0938\u0947\u0935 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...',
      download: 'PDF \u0921\u093e\u0909\u0928\u0932\u094b\u0921 \u0915\u0930\u0947\u0902',
    },
    bho: {
      title: '\u0915\u093e\u0928\u0942\u0928\u0940 \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c \u091c\u0928\u0930\u0947\u091f\u0930',
      desc: '\u0906\u0938\u093e\u0928 \u092b\u0949\u0930\u094d\u092e \u092d\u0930 \u0915\u0947 \u0915\u093e\u0928\u0942\u0928\u0940 \u0915\u093e\u0917\u091c \u092c\u0928\u093e\u0908\u0902\u0964',
      disclaimerLabel: '\u0905\u0938\u094d\u0935\u0940\u0915\u0930\u0923:',
      disclaimer: '\u0908 \u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c \u0916\u093e\u0932\u0940 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u0916\u093e\u0924\u093f\u0930 \u092c\u093e\u0964',
      selectType: '\u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c \u092a\u094d\u0930\u0915\u093e\u0930 \u091a\u0941\u0928\u0940\u0902',
      generate: '\u092c\u0928\u093e\u0908\u0902 ->',
      backToTypes: '<- \u0935\u093e\u092a\u0938',
      previewDoc: '\u0926\u0938\u094d\u0924\u093e\u0935\u0947\u091c \u092a\u094d\u0930\u0940\u0935\u094d\u092f\u0942',
      reset: '\u0930\u0940\u0938\u0947\u091f',
      backToForm: '<- \u092b\u0949\u0930\u094d\u092e \u092a\u0930 \u0935\u093e\u092a\u0938',
      preview: '\u092a\u094d\u0930\u0940\u0935\u094d\u092f\u0942',
      edit: '\u0938\u0902\u092a\u093e\u0926\u0928',
      saving: '\u0938\u0947\u0935 \u0939\u094b \u0930\u0939\u0932 \u092c\u093e...',
      download: 'PDF \u0921\u093e\u0909\u0928\u0932\u094b\u0921',
    },
    bn: {
      title: '\u0986\u0987\u09a8\u09bf \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f \u099c\u09c7\u09a8\u09be\u09b0\u09c7\u099f\u09b0',
      desc: '\u09b8\u09b9\u099c \u09ab\u09b0\u09cd\u09ae \u09aa\u09c2\u09b0\u09a3 \u0995\u09b0\u09c7 PDF \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f \u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09c1\u09a8\u0964',
      disclaimerLabel: '\u09a1\u09bf\u09b8\u0995\u09cd\u09b2\u09c7\u09ae\u09be\u09b0:',
      disclaimer: '\u098f\u0987 \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f \u09b6\u09c1\u09a7\u09c1\u09ae\u09be\u09a4\u09cd\u09b0 \u09a4\u09a5\u09cd\u09af\u0997\u09a4 \u0989\u09a6\u09cd\u09a6\u09c7\u09b6\u09cd\u09af\u09c7\u0964',
      selectType: '\u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f \u099f\u09be\u0987\u09aa \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8',
      generate: '\u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09c1\u09a8 ->',
      backToTypes: '<- \u09ab\u09bf\u09b0\u09c7 \u09af\u09be\u09a8',
      previewDoc: '\u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f \u09aa\u09cd\u09b0\u09bf\u09ad\u09bf\u0989',
      reset: '\u09b0\u09bf\u09b8\u09c7\u099f',
      backToForm: '<- \u09ab\u09b0\u09cd\u09ae\u09c7 \u09ab\u09bf\u09b0\u09c7 \u09af\u09be\u09a8',
      preview: '\u09aa\u09cd\u09b0\u09bf\u09ad\u09bf\u0989',
      edit: '\u098f\u09a1\u09bf\u099f',
      saving: '\u09b8\u09c7\u09ad \u09b9\u099a\u09cd\u099b\u09c7...',
      download: 'PDF \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1',
    },
    hinglish: {
      title: 'Legal Document Generator',
      desc: 'Simple form bhar ke legal documents banao. Preview dekho aur PDF download karo.',
      disclaimerLabel: 'Disclaimer:',
      disclaimer: 'Ye documents informational purpose ke liye hain. Official use se pehle lawyer se consult karo.',
      selectType: 'Document Type Select karo',
      generate: 'Generate ->',
      backToTypes: '<- Back',
      previewDoc: 'Document Preview',
      reset: 'Reset',
      backToForm: '<- Back to Form',
      preview: 'Preview',
      edit: 'Edit',
      saving: 'Saving...',
      download: 'Download PDF',
    },
  };
  const ui = uiByLang[language] || uiByLang.en;
  const templateText = {
    hi: {
      titles: {
        'fir-draft': 'एफआईआर ड्राफ्ट',
        'rti-application': 'आरटीआई आवेदन',
        'legal-notice': 'कानूनी नोटिस',
        'consumer-complaint': 'उपभोक्ता शिकायत',
        'rent-notice': 'किराया नोटिस',
      },
      descs: {
        'fir-draft': 'पुलिस स्टेशन में शिकायत हेतु FIR ड्राफ्ट तैयार करें',
        'rti-application': 'सरकारी विभागों से सूचना प्राप्त करने के लिए RTI आवेदन',
        'legal-notice': 'विपक्षी पक्ष को भेजने के लिए औपचारिक कानूनी नोटिस',
        'consumer-complaint': 'खराब सामान/सेवा के खिलाफ उपभोक्ता शिकायत',
        'rent-notice': 'किराया संबंधी मामलों के लिए किरायेदार/मालिक को नोटिस',
      },
      labels: {
        complainant_name: 'शिकायतकर्ता का नाम', complainant_address: 'शिकायतकर्ता का पता', father_name: 'पिता/पति का नाम', police_station: 'पुलिस स्टेशन का नाम',
        incident_date: 'घटना की तारीख', incident_time: 'घटना का समय', incident_location: 'घटना का स्थान', description: 'घटना का विवरण', accused_details: 'आरोपी का विवरण',
        witnesses: 'गवाहों का विवरण', stolen_property: 'खोई/चोरी संपत्ति', applicant_name: 'आवेदक का नाम', applicant_address: 'आवेदक का पता',
        applicant_phone: 'फोन नंबर', applicant_email: 'ईमेल पता', department: 'विभाग/लोक प्राधिकरण', pio_designation: 'PIO पदनाम', questions: 'मांगी गई जानकारी',
        period: 'जानकारी की अवधि', fee_mode: 'शुल्क भुगतान तरीका', sender_name: 'प्रेषक का नाम', sender_address: 'प्रेषक का पता', sender_phone: 'प्रेषक फोन',
        recipient_name: 'प्राप्तकर्ता का नाम', recipient_address: 'प्राप्तकर्ता का पता', subject: 'नोटिस का विषय', background: 'पृष्ठभूमि/तथ्य', grievance: 'शिकायत',
        relief_sought: 'मांगी गई राहत/कार्रवाई', deadline_days: 'उत्तर समयसीमा (दिन)', opposite_party: 'विपक्षी पक्ष', opposite_address: 'विपक्षी पक्ष का पता',
        product_service: 'उत्पाद/सेवा विवरण', purchase_date: 'खरीद तिथि', purchase_amount: 'भुगतान राशि (₹)', invoice_no: 'बिल नंबर',
        deficiency: 'दोष/कमी का विवरण', previous_complaints: 'पूर्व शिकायतें', compensation: 'मुआवजा दावा (₹)', property_address: 'किराये की संपत्ति का पता',
        rent_amount: 'मासिक किराया (₹)', agreement_date: 'किराया समझौता तिथि', notice_reason: 'नोटिस का कारण', pending_amount: 'बकाया राशि (₹)',
      },
    },
    bn: {
      titles: { 'fir-draft': 'এফআইআর ড্রাফট', 'rti-application': 'আরটিআই আবেদন', 'legal-notice': 'লিগ্যাল নোটিস', 'consumer-complaint': 'ভোক্তা অভিযোগ', 'rent-notice': 'ভাড়া নোটিস' },
      descs: { 'fir-draft': 'থানায় অভিযোগের জন্য FIR ড্রাফট তৈরি করুন', 'rti-application': 'সরকারি দপ্তর থেকে তথ্যের জন্য RTI আবেদন', 'legal-notice': 'বিপরীত পক্ষকে পাঠানোর আইনি নোটিস', 'consumer-complaint': 'ত্রুটিপূর্ণ পণ্য/সেবার বিরুদ্ধে অভিযোগ', 'rent-notice': 'ভাড়া সংক্রান্ত নোটিস' },
      labels: { complainant_name: 'অভিযোগকারীর নাম', complainant_address: 'অভিযোগকারীর ঠিকানা', father_name: 'পিতা/স্বামীর নাম', police_station: 'থানার নাম', incident_date: 'ঘটনার তারিখ', incident_time: 'ঘটনার সময়', incident_location: 'ঘটনার স্থান', description: 'ঘটনার বিবরণ' },
    },
    bho: {
      titles: { 'fir-draft': 'एफआईआर ड्राफ्ट', 'rti-application': 'आरटीआई आवेदन', 'legal-notice': 'कानूनी नोटिस', 'consumer-complaint': 'उपभोक्ता शिकायत', 'rent-notice': 'किराया नोटिस' },
      descs: { 'fir-draft': 'थाना खातिर FIR ड्राफ्ट बनाईं', 'rti-application': 'सरकारी जानकारी खातिर RTI आवेदन', 'legal-notice': 'कानूनी नोटिस तैयार करीं', 'consumer-complaint': 'खराब सेवा/सामान के शिकायत', 'rent-notice': 'किराया मामला के नोटिस' },
      labels: { complainant_name: 'शिकायतकर्ता के नाम', complainant_address: 'शिकायतकर्ता के पता', father_name: 'पिता/पति के नाम', police_station: 'थाना के नाम', incident_date: 'घटना के तारीख', incident_time: 'घटना के समय', incident_location: 'घटना के जगह', description: 'घटना के विवरण' },
    },
    hinglish: {
      titles: { 'fir-draft': 'FIR Draft', 'rti-application': 'RTI Application', 'legal-notice': 'Legal Notice', 'consumer-complaint': 'Consumer Complaint', 'rent-notice': 'Rent Notice' },
      descs: { 'fir-draft': 'Police station ke liye FIR draft banao', 'rti-application': 'Govt info ke liye RTI apply karo', 'legal-notice': 'Opposite party ko bhejne ke liye legal notice', 'consumer-complaint': 'Defective goods/services complaint', 'rent-notice': 'Rent-related notice' },
      labels: { complainant_name: 'Complainant Name', complainant_address: 'Complainant Address', description: 'Incident Description' },
    },
  };
  const tt = templateText[language];
  const localizedTemplates = tt
    ? docTemplates.map((tmpl) => ({
        ...tmpl,
        title: tt.titles[tmpl.id] || tmpl.title,
        desc: tt.descs[tmpl.id] || tmpl.desc,
        fields: tmpl.fields.map((f) => ({ ...f, label: tt.labels[f.name] || f.label })),
      }))
    : docTemplates;
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    if (!selectedDoc) return;
    const doc = generatePDF(selectedDoc, formData);
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    setPreview(url);
  };

  const handleDownload = async () => {
    if (!selectedDoc) return;
    setSaving(true);

    // Save to backend
    try {
      await fetch(`${API}/documents/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedDoc.id, formData }),
      });
    } catch (e) {
      // Backend save is optional, continue with PDF download
    }

    const doc = generatePDF(selectedDoc, formData);
    doc.save(`SETU_${selectedDoc.id}_${new Date().toISOString().split('T')[0]}.pdf`);
    setSaving(false);
  };

  const handleReset = () => {
    setFormData({});
    setPreview(null);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>{ui.title}</h1>
        <p>
          {ui.desc}
        </p>
      </div>

      {/* Document Types */}
      {!selectedDoc && (
        <>
          <div style={{
            background: 'var(--accent-bg)', borderRadius: 16,
            padding: '20px 24px', marginBottom: 32,
            border: '1px solid rgba(217, 119, 6, 0.15)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>

            <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.6 }}>
              <strong>{ui.disclaimerLabel}</strong> {ui.disclaimer}
            </p>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{ui.selectType}</h2>
          <div className="grid-3">
            {localizedTemplates.map((tmpl, i) => (
              <button key={i} onClick={() => { setSelectedDoc(tmpl); setFormData({}); setPreview(null); }}
                className="card card-clickable fade-up" style={{
                  textAlign: 'left', animationDelay: `${i * 0.06}s`,
                }}>

                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{tmpl.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tmpl.desc}</p>
                <div style={{
                  marginTop: 14, fontSize: 13, fontWeight: 600, color: 'var(--primary)',
                }}>{ui.generate}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Form */}
      {selectedDoc && !preview && (
        <div className="fade-in">
          <button onClick={() => { setSelectedDoc(null); setFormData({}); }} className="back-btn">
            {ui.backToTypes}
          </button>

          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>{selectedDoc.title}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{selectedDoc.desc}</p>
          </div>

          <div className="card" style={{ maxWidth: 700 }}>
            {selectedDoc.fields.map(field => (
              <div key={field.name} className="form-group">
                <label>
                  {field.label}
                  {field.required && <span style={{ color: 'var(--danger)', marginLeft: 4 }}>*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    placeholder={field.label}
                    rows={3}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    placeholder={field.label}
                  />
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={handlePreview} className="btn btn-primary" style={{ flex: 1 }}>
                {ui.previewDoc}
              </button>
              <button onClick={handleReset} className="btn btn-secondary">
                {ui.reset}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="fade-in">
          <button onClick={() => setPreview(null)} className="back-btn">
            {ui.backToForm}
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20, flexWrap: 'wrap', gap: 12,
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>
              {selectedDoc.title} - {ui.preview}
            </h2>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setPreview(null)} className="btn btn-secondary">
                {ui.edit}
              </button>
              <button onClick={handleDownload} className="btn btn-primary" disabled={saving}>
                {saving ? ui.saving : ui.download}
              </button>
            </div>
          </div>

          <div style={{
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)',
          }}>
            <iframe
              src={preview}
              style={{ width: '100%', height: 700, border: 'none' }}
              title="Document Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

