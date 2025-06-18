// backend/controllers/reportController.js
import ReportService from '../services/reportService.mjs';
import fs from 'fs';
export class ReportController {
  constructor() {
    this.reportService = new ReportService();
  }

  async generateReport(req, res) {
    try {
      const {
        patientId,
        diagnosis,
        confidence,
        views,
        date,
        heatmapUrls
      } = req.body;

      // Validate required fields
      if (!patientId || !diagnosis || confidence === undefined || !views || !date) {
        return res.status(400).json({
          error: 'Missing required fields',
          required: ['patientId', 'diagnosis', 'confidence', 'views', 'date']
        });
      }

      // Validate data types
      if (typeof confidence !== 'number' || confidence < 0 || confidence > 100) {
        return res.status(400).json({
          error: 'Confidence must be a number between 0 and 100'
        });
      }

      if (!Array.isArray(views)) {
        return res.status(400).json({
          error: 'Views must be an array'
        });
      }

      if (!Array.isArray(heatmapUrls)) {
        return res.status(400).json({
          error: 'HeatmapUrls must be an array'
        });
      }

      // Generate the report
      const pdfBuffer = await this.reportService.generateReport({
        patientId,
        diagnosis,
        confidence,
        views,
        date,
        heatmapUrls: heatmapUrls || []
      });

      // Set response headers
      const fileName = `medical-report-${patientId}-${new Date().toISOString().split('T')[0]}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Length', pdfBuffer.length);

      // Send the PDF
      res.end(pdfBuffer); // ✅ safer for binary data

    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({
        error: 'Failed to generate report',
        message: error.message
      });
    }
  }

  // Alternative method to return HTML instead of PDF
  async generateHTMLReport(req, res) {
    try {
      const {
        patientId,
        diagnosis,
        confidence,
        views,
        date,
        heatmapUrls
      } = req.body;

      // Validate required fields (same as above)
      if (!patientId || !diagnosis || confidence === undefined || !views || !date) {
        return res.status(400).json({
          error: 'Missing required fields',
          required: ['patientId', 'diagnosis', 'confidence', 'views', 'date']
        });
      }

      // Generate HTML content
      const htmlContent = await this.reportService.generateHTML({
        patientId,
        diagnosis,
        confidence,
        views,
        date,
        heatmapUrls: heatmapUrls || []
      });

      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);

    } catch (error) {
      console.error('Error generating HTML report:', error);
      res.status(500).json({
        error: 'Failed to generate HTML report',
        message: error.message
      });
    }
  }
}

export default ReportController;