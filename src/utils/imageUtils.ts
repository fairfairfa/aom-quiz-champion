import html2canvas from 'html2canvas';
import { QuizResult } from '@/types/quiz';

export const generateResultImage = async (
  result: QuizResult,
  studentName: string = 'ออม'
): Promise<Blob> => {
  // Create a temporary div for the result card
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'fixed';
  tempDiv.style.top = '-9999px';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  tempDiv.style.padding = '40px';
  tempDiv.style.backgroundColor = '#ffffff';
  tempDiv.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  tempDiv.style.borderRadius = '20px';
  tempDiv.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';

  const now = new Date();
  const dateStr = now.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const percentage = Math.round((result.score / result.total) * 100);
  
  const getGrade = () => {
    if (result.score >= 18) return 'ดีเยี่ยม';
    if (result.score >= 15) return 'ดี';
    if (result.score >= 10) return 'พอใช้';
    return 'ต้องปรับปรุง';
  };

  const getEmoji = () => {
    if (result.score >= 18) return '🏆';
    if (result.score >= 15) return '🎯';
    if (result.score >= 10) return '📚';
    return '💪';
  };

  tempDiv.innerHTML = `
    <div style="text-align: center; color: #1f2937;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; margin: -40px -40px 30px -40px; border-radius: 20px 20px 0 0;">
        <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: bold;">ผลการสอบครูผู้ช่วย</h1>
        <p style="margin: 0; font-size: 18px; opacity: 0.9;">นักเรียน: ${studentName}</p>
      </div>

      <!-- Score Circle -->
      <div style="margin: 40px 0;">
        <div style="display: inline-block; position: relative; width: 180px; height: 180px; border-radius: 50%; background: conic-gradient(from 0deg, #10b981 0deg ${percentage * 3.6}deg, #e5e7eb ${percentage * 3.6}deg 360deg); padding: 8px;">
          <div style="width: 100%; height: 100%; border-radius: 50%; background: white; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="font-size: 48px; font-weight: bold; color: #10b981; margin-bottom: 5px;">${result.score}</div>
            <div style="font-size: 16px; color: #6b7280;">จาก ${result.total}</div>
          </div>
        </div>
        <div style="margin-top: 20px; font-size: 24px;">${getEmoji()}</div>
        <div style="margin-top: 10px; font-size: 20px; font-weight: bold; color: #1f2937;">${percentage}% - ${getGrade()}</div>
      </div>

      <!-- Details -->
      <div style="background: #f9fafb; padding: 25px; border-radius: 15px; margin: 30px 0; text-align: left;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="color: #6b7280; font-weight: 500;">📅 วันที่ทำแบบทดสอบ:</span>
          <span style="font-weight: bold; color: #1f2937;">${dateStr}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="color: #6b7280; font-weight: 500;">⏰ เวลา:</span>
          <span style="font-weight: bold; color: #1f2937;">${timeStr}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <span style="color: #6b7280; font-weight: 500;">✅ ตอบถูก:</span>
          <span style="font-weight: bold; color: #10b981;">${result.score} ข้อ</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #6b7280; font-weight: 500;">❌ ตอบผิด:</span>
          <span style="font-weight: bold; color: #ef4444;">${result.total - result.score} ข้อ</span>
        </div>
      </div>

      <!-- Footer -->
      <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; color: #6b7280; font-size: 14px;">
        <p style="margin: 0;">แบบทดสอบครูผู้ช่วย - ระบบออนไลน์</p>
        <p style="margin: 5px 0 0 0;">สร้างโดย Quiz Champion App</p>
      </div>
    </div>
  `;

  document.body.appendChild(tempDiv);

  try {
    const canvas = await html2canvas(tempDiv, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: false,
    });

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png', 1.0);
    });
  } finally {
    document.body.removeChild(tempDiv);
  }
};

export const downloadImage = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};