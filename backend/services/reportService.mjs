import puppeteer from 'puppeteer';
import { join,dirname } from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dev = true;


export class ReportService {
  constructor() {
    this.templatePath = join(__dirname, '../templates/report-template.html');
  }

  async generateReport(reportData) {
    try {
      // Generate HTML content
      const htmlContent = await this.generateHTML(reportData);
      
      // Convert HTML to PDF using Puppeteer
      const pdfBuffer = await this.generatePDF(htmlContent);
      
      return pdfBuffer;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  async generateHTML(data) {
    const {
      patientId,
      diagnosis,
      confidence,
      views,
      date,
      heatmapUrls
    } = data;

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Generate heatmap images HTML
    const heatmapImagesHTML = heatmapUrls.map((url, index) => `
      <div class="heatmap-container">
        <h4>View ${index + 1}: ${views[index] || 'Unknown View'}</h4>
        <img src="${url}" alt="Heatmap ${index + 1}" class="heatmap-image">
      </div>
    `).join('');

    const confidenceColor = this.getConfidenceColor(confidence);
    const confidenceLevel = this.getConfidenceLevel(confidence);

    return `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Medical Analysis Report</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
    
            :root {
                --black: #000;
                --black-light: #222;
                --black-70: #000000b3;
                --white: #fff;
                --purple-dark: #1e0a32;
                --purple-medium: #782396;
                --purple-light: #ecbcf6;
                --purple-bg: #f9f3ff;
                --cyan: #00dcc8;
                --green: #27ae60;
                --green-dark: #006400;
                --yellow: #ffd700;
                --red: #cb1515;
                
                --holographic-primary: linear-gradient(45deg, #ff99ff, #99ffff, #ff99ff);
                --holographic-secondary: linear-gradient(135deg, #ff8ac5, #8ba6ed, #99ffff);
                --holographic-accent: linear-gradient(90deg, #ff99ff, #99ffff);
                --holographic-pearl: linear-gradient(135deg, #ffffff, #ffe1e1, #e1ffe1, #e1e1ff, #ffffff);
            }
    
            body {
                font-family: 'Poppins', sans-serif;
                line-height: 1.6;
                color: var(--black-light);
                background: linear-gradient(135deg, #f9f3ff 0%, #e1e1ff 100%);
            }
    
            .report-container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                box-shadow: 0 10px 30px rgba(120, 35, 150, 0.1);
                overflow: hidden;
                position: relative;
            }
            
            .report-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 5px;
                background: var(--holographic-secondary);
            }
    
            .header {
                background: linear-gradient(135deg, var(--purple-dark) 0%, #3a0d5e 100%);
                color: white;
                padding: 2.5rem;
                position: relative;
                overflow: hidden;
            }
            
            .header::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255,153,255,0.1), rgba(153,255,255,0.1));
                pointer-events: none;
            }
    
            .header h1 {
                font-size: 2.8rem;
                margin-bottom: 0.5rem;
                font-weight: 700;
                color:#ecbcf6;
                display: inline-block;
            }
    
            .header p {
                font-size: 1.2rem;
                opacity: 0.9;
                max-width: 80%;
                margin-top: 0.5rem;
            }
    
            .report-meta {
                background: var(--holographic-pearl);
                padding: 1.5rem 2.5rem;
                border-bottom: 1px solid rgba(120, 35, 150, 0.1);
            }
    
            .meta-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax( 1fr));
                gap: 1.5rem;
            }
    
            .meta-item {
                background: rgba(255, 255, 255, 0.8);
                padding: 1.2rem;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                border: 1px solid rgba(120, 35, 150, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .meta-item:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(120, 35, 150, 0.15);
            }
    
            .meta-label {
                font-weight: 600;
                color: var(--purple-medium);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .meta-label i {
                font-size: 1.1rem;
            }
    
            .meta-value {
                font-size: 1.3rem;
                font-weight: 600;
                color: var(--black-light);
            }
    
            .content {
                padding: 2.5rem;
            }
    
            .section {
                margin-bottom: 3rem;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
    
            .section-title {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--purple-dark);
                margin-bottom: 1.5rem;
                padding-bottom: 0.8rem;
                position: relative;
                display: inline-block;
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 200px;
                height: 4px;
                border-radius: 10px;
                background: var(--holographic-accent);
            }
    
            .diagnosis-card {
                background: linear-gradient(135deg, rgba(249, 243, 255, 0.8) 0%, rgba(225, 225, 255, 0.8) 100%);
                border: 1px solid rgba(120, 35, 150, 0.1);
                border-radius: 16px;
                padding: 2.5rem;
                margin-bottom: 2.5rem;
                box-shadow: 0 10px 30px rgba(120, 35, 150, 0.1);
                position: relative;
                overflow: hidden;
            }
            
            .diagnosis-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, rgba(255,153,255,0.05), rgba(153,255,255,0.05));
                pointer-events: none;
            }
    
            .diagnosis-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--purple-medium);
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
            }
            
            .diagnosis-title i {
                font-size: 1.8rem;
                color: var(--cyan);
            }
    
            .diagnosis-result {
                font-size: 2rem;
                font-weight: 700;
                color: var(--black-light);
                margin-bottom: 1.5rem;
                padding: 1rem 1.5rem;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 12px;
                border-left: 5px solid ${confidence >= 80 ? 'var(--green)' : confidence >= 60 ? 'var(--yellow)' : 'var(--red)'};
                display: inline-block;
                text-transform:capitalize;
            }
    
            .confidence-meter {
                background: rgba(255, 255, 255, 0.5);
                border-radius: 30px;
                padding: 0.8rem;
                margin: 1.5rem 0;
                box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
            }
    
            .confidence-bar {
                height: 24px;
                border-radius: 30px;
                background: ${confidenceColor};
                width: ${confidence}%;
                transition: width 1.5s ease;
                position: relative;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            
            .confidence-bar::after {
                content: '${confidence}%';
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                font-weight: 700;
                font-size: 0.9rem;
            }
    
            .confidence-text {
                display: flex;
                justify-content: space-between;
                font-weight: 600;
                margin-top: 0.8rem;
                color: var(--black-70);
                font-size: 0.9rem;
            }
            
            .confidence-level {
                color: ${confidence >= 80 ? 'var(--green-dark)' : confidence >= 60 ? 'var(--yellow)' : 'var(--red)'};
                font-weight: 700;
            }
    
            .views-section {
                margin: 2.5rem 0;
            }
    
            .views-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;
                margin-top: 1.5rem;
            }
    
            .view-tag {
                background: linear-gradient(135deg, var(--purple-dark) 0%, var(--purple-medium) 100%);
                color: white;
                padding: 0.6rem 1.2rem;
                border-radius: 30px;
                font-size: 0.95rem;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 4px 10px rgba(120, 35, 150, 0.2);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .view-tag:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(120, 35, 150, 0.3);
            }
            
            .view-tag i {
                font-size: 1rem;
            }
    
            .heatmaps-section {
                margin-top: 2.5rem;
            }
    
            .heatmaps-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
                gap: 2.5rem;
                margin-top: 2rem;
            }
    
            .heatmap-container {
                background: white;
                border: 1px solid rgba(120, 35, 150, 0.1);
                border-radius: 16px;
                padding: 1.8rem;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .heatmap-container:hover {
                transform: translateY(-5px);
                box-shadow: 0 12px 30px rgba(120, 35, 150, 0.15);
            }
    
            .heatmap-container h4 {
                color: var(--purple-medium);
                margin-bottom: 1.2rem;
                font-size: 1.2rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .heatmap-container h4 i {
                color: var(--cyan);
            }
    
            .heatmap-image {
                width: 100%;
                height: auto;
                border-radius: 12px;
                border: 1px solid rgba(120, 35, 150, 0.1);
                transition: transform 0.3s ease;
            }
            
            .heatmap-container:hover .heatmap-image {
                transform: scale(1.02);
            }
    
            .analysis-section {
                margin-top: 2.5rem;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 16px;
                padding: 2rem;
                border: 1px solid rgba(120, 35, 150, 0.1);
            }
            
            .analysis-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--purple-dark);
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
            }
            
            .analysis-title i {
                color: var(--cyan);
            }
            
            .analysis-content {
                font-size: 1.1rem;
                line-height: 1.8;
                color: var(--black-70);
            }
            
            .analysis-content p {
                margin-bottom: 1rem;
            }
            
            .analysis-content ul {
                margin-left: 1.5rem;
                margin-bottom: 1.5rem;
            }
            
            .analysis-content li {
                margin-bottom: 0.8rem;
                position: relative;
                padding-left: 1.5rem;
            }
            
            .analysis-content li::before {
                content: '•';
                position: absolute;
                left: 0;
                color: var(--purple-medium);
                font-weight: bold;
            }
    
            .generated-info {
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(120, 35, 150, 0.1);
                border-radius: 12px;
                padding: 1.5rem;
                margin-top: 2.5rem;
                font-size: 0.95rem;
                color: var(--black-70);
                position: relative;
                overflow: hidden;
            }
            
            .generated-info::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 5px;
                height: 100%;
                background: var(--holographic-secondary);
            }
            
            .generated-info strong {
                color: var(--purple-dark);
                font-weight: 700;
            }
    
            .footer {
                background: linear-gradient(135deg, var(--purple-dark) 0%, #3a0d5e 100%);
                color: white;
                text-align: center;
                padding: 2rem;
                font-size: 0.95rem;
                position: relative;
                overflow: hidden;
            }
            
            .footer::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(255,153,255,0.1), rgba(153,255,255,0.1));
                pointer-events: none;
            }
            
            .footer-logo {
                margin-bottom: 1rem;
                font-size: 1.5rem;
                font-weight: 700;
                background: var(--holographic-secondary);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                display: inline-block;
            }
    
            @media print {
                body {
                    background: white;
                }
                .report-container {
                    box-shadow: none;
                    margin: 0;
                    max-width: 100%;
                }
                .confidence-bar {
                    print-color-adjust: exact;
                    -webkit-print-color-adjust: exact;
                }
            }
    
            @media (max-width: 768px) {
                .header {
                    padding: 1.5rem;
                }
                .header h1 {
                    font-size: 2rem;
                }
                .meta-grid {
                    grid-template-columns: 1fr;
                }
                .heatmaps-grid {
                    grid-template-columns: 1fr;
                }
                .content {
                    padding: 1.5rem;
                }
                .diagnosis-card {
                    padding: 1.5rem;
                }
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body>
        <div class="report-container">
            <div class="header">
                <h1>ACLYZE AI</h1>
                <p>Medical Analysis Report</p>
            </div>
    
            <div class="report-meta">
                <div class="meta-grid">
                    <div class="meta-item">
                        <div class="meta-label"><i class="fas fa-user-circle"></i> Patient ID</div>
                        <div class="meta-value">${patientId}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label"><i class="fas fa-calendar-alt"></i> Report Date</div>
                        <div class="meta-value">${formattedDate}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label"><i class="fas fa-clock"></i> Generated Time</div>
                        <div class="meta-value">${formattedTime}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label"><i class="fas fa-layer-group"></i> Views Analyzed</div>
                        <div class="meta-value">${views.length}</div>
                    </div>
                </div>
            </div>
    
            <div class="content">
                <div class="section">
                    <h2 class="section-title">Diagnostic Results</h2>
                    <div class="diagnosis-card">
                        <div class="diagnosis-title"><i class="fas fa-stethoscope"></i> Primary Diagnosis</div>
                        <div class="diagnosis-result">${diagnosis}</div>
                        
                        <div class="confidence-meter">
                            <div class="confidence-bar"></div>
                        </div>
                        <div class="confidence-text">
                            <span>Confidence Level:</span>
                            <span class="confidence-level">${confidence}% (${confidenceLevel})</span>
                        </div>
                    </div>
                </div>
    
                <div class="section views-section">
                    <h2 class="section-title">Analysis Overview</h2>
                    <p>This comprehensive analysis was performed on ${views.length} different medical views using our advanced AI diagnostic system.</p>
                    <div class="views-list">
                        ${views.map(view => `<span class="view-tag"><i class="fas fa-film"></i>${view}</span>`).join('')}
                    </div>
                </div>
    
                <div class="section heatmaps-section">
                    <h2 class="section-title">Heatmap Analysis</h2>
                    <p>The following heatmaps highlight areas of interest identified by our AI analysis system, providing visual insights into potential abnormalities.</p>
                    <div class="heatmaps-grid">
                        ${heatmapUrls.map((url, index) => `
                          <div class="heatmap-container">
                            <h4><i class="fas fa-fire"></i> View ${index + 1}: ${views[index] || 'Unknown View'}</h4>
                            <img src="${url}" alt="Heatmap ${index + 1}" class="heatmap-image">
                          </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Clinical Interpretation</h2>
                    <div class="analysis-section">
                        <div class="analysis-title"><i class="fas fa-clipboard-check"></i> Expert Analysis</div>
                        <div class="analysis-content">
                            <p>Based on the AI-assisted analysis of the provided MRI scans, the following observations have been made:</p>
                            <ul>
                                <li>Primary diagnosis indicates <strong>${diagnosis}</strong> with a confidence level of <strong>${confidence}%</strong>.</li>
                                <li>The AI system has analyzed ${views.length} different views to provide a comprehensive assessment.</li>
                                <li>Areas of interest have been highlighted in the heatmap visualizations above.</li>
                                ${confidence >= 80 ? '<li>The high confidence score suggests a reliable diagnostic assessment.</li>' : 
                                confidence >= 60 ? '<li>The moderate confidence score suggests further clinical correlation may be beneficial.</li>' : 
                                '<li>The lower confidence score indicates that additional clinical evaluation is strongly recommended.</li>'}
                            </ul>
                            <p>This report should be reviewed by a qualified healthcare professional for final interpretation and treatment planning.</p>
                        </div>
                    </div>
                </div>
    
                <div class="generated-info">
                    <strong>Important Notice:</strong> This report is generated by an AI diagnostic system and should be reviewed by qualified medical professionals. 
                    The results should not be used as the sole basis for medical decisions without proper clinical correlation.
                </div>
            </div>
    
            <div class="footer">
                <div class="footer-logo">ACLyze AI</div>
                <p>&copy; ${new Date().getFullYear()} Medical AI Analysis System | Generated on ${formattedDate} at ${formattedTime}</p>
            </div>
        </div>
    
        
    </body>
    </html>`;
  }

  async generatePDF(htmlContent) {
    const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
  
    try {
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
      // Evaluate full height more accurately
      const bodyHeight = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        return Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
      });
  
      const heightInMm = bodyHeight * 0.264583; // Convert px to mm (1px ≈ 0.264583mm)
      const pdfBuffer = await page.pdf({
        width: '210mm', // A4 width
        height: `${heightInMm}mm`,
        printBackground: true,
        margin: {
          top: '0mm',
          right: '0mm',
          bottom: '0mm',
          left: '0mm'
        }
      });
  
      return pdfBuffer;
    } finally {
      await browser.close();
    }
  }
  
  

  getConfidenceColor(confidence) {
    if (confidence >= 80) return 'linear-gradient(90deg, #28a745, #20c997)';
    if (confidence >= 60) return 'linear-gradient(90deg, #ffc107, #fd7e14)';
    return 'linear-gradient(90deg, #dc3545, #e83e8c)';
  }

  getConfidenceLevel(confidence) {
    if (confidence >= 80) return 'High';
    if (confidence >= 60) return 'Medium';
    return 'Low';
  }
}

export default  ReportService;