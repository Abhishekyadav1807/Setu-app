import { useState } from 'react';
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
      { name: 'purchase_amount', label: 'Amount Paid (₹)', type: 'text' },
      { name: 'invoice_no', label: 'Invoice/Bill Number', type: 'text' },
      { name: 'deficiency', label: 'Nature of Defect/Deficiency', type: 'textarea', placeholder: 'Describe the defect or deficiency in detail...', required: true },
      { name: 'previous_complaints', label: 'Previous Complaints Made', type: 'textarea', placeholder: 'Details of complaints made to seller/company...' },
      { name: 'compensation', label: 'Compensation Claimed (₹)', type: 'text', placeholder: 'Total compensation amount sought' },
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
      { name: 'rent_amount', label: 'Monthly Rent Amount (₹)', type: 'text', required: true },
      { name: 'agreement_date', label: 'Rent Agreement Date', type: 'date' },
      { name: 'notice_reason', label: 'Reason for Notice', type: 'textarea', placeholder: 'e.g., Non-payment of rent, eviction notice, deposit refund...', required: true },
      { name: 'pending_amount', label: 'Pending Amount (if any) (₹)', type: 'text' },
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
      addText(`Application Fee: ₹10 paid via ${formData.fee_mode || 'Indian Postal Order'}`, { size: 11 });
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
      if (formData.purchase_amount) addText(`Amount Paid: ₹${formData.purchase_amount}`, { size: 11 });
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
      if (formData.compensation) addText(`2. Pay compensation of ₹${formData.compensation} for mental agony and harassment`, { size: 11 });
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
      addText(`Monthly Rent: ₹${formData.rent_amount || '[Amount]'}`, { size: 11 });
      if (formData.agreement_date) addText(`Rent Agreement Date: ${formData.agreement_date}`, { size: 11 });
      y += 4;
      addText('REASON FOR NOTICE:', { size: 11, style: 'bold' });
      addText(formData.notice_reason || '[Reason for notice]', { size: 11 });
      y += 2;
      if (formData.pending_amount) {
        addText(`Pending Amount: ₹${formData.pending_amount}`, { size: 11, style: 'bold' });
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
        <h1>Legal Document Generator</h1>
        <p>
          Generate formatted legal documents by filling simple forms. 
          Preview the document and download as PDF.
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
              <strong>Disclaimer:</strong> These documents are generated for informational and educational purposes only. 
              Please consult a qualified lawyer before using any legal document in official proceedings.
            </p>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Select Document Type</h2>
          <div className="grid-3">
            {docTemplates.map((tmpl, i) => (
              <button key={i} onClick={() => { setSelectedDoc(tmpl); setFormData({}); setPreview(null); }}
                className="card card-clickable fade-up" style={{
                  textAlign: 'left', animationDelay: `${i * 0.06}s`,
                }}>

                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{tmpl.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{tmpl.desc}</p>
                <div style={{
                  marginTop: 14, fontSize: 13, fontWeight: 600, color: 'var(--primary)',
                }}>Generate →</div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Form */}
      {selectedDoc && !preview && (
        <div className="fade-in">
          <button onClick={() => { setSelectedDoc(null); setFormData({}); }} className="back-btn">
            ← Back to Document Types
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
                    placeholder={field.placeholder || field.label}
                    rows={3}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder || field.label}
                  />
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={handlePreview} className="btn btn-primary" style={{ flex: 1 }}>
                Preview Document
              </button>
              <button onClick={handleReset} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="fade-in">
          <button onClick={() => setPreview(null)} className="back-btn">
            ← Back to Form
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20, flexWrap: 'wrap', gap: 12,
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>
              {selectedDoc.title} — Preview
            </h2>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setPreview(null)} className="btn btn-secondary">
                Edit
              </button>
              <button onClick={handleDownload} className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Download PDF'}
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
