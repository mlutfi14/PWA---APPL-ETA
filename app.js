const cutiUmum = [
  '2025-05-01', // Hari Pekerja
  '2025-05-17', // Hari Wesak
  // Tambah lagi cuti umum + cuti Melaka sini
];

function isCuti(date) {
  const day = date.getDay(); // 0 = Ahad, 6 = Sabtu
  const dateStr = date.toISOString().split('T')[0];
  return day === 0 || day === 6 || cutiUmum.includes(dateStr);
}

function tambahHariBekerja(startDate, hariBekerja) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + 1); // mula hari selepas LPO

  let count = 0;
  while (count < hariBekerja) {
    if (!isCuti(date)) count++;
    if (count < hariBekerja) date.setDate(date.getDate() + 1);
  }

  return date;
}

function kiraKelewatan() {
  const lpoDate = new Date(document.getElementById("lpoDate").value);
  const receivedDate = new Date(document.getElementById("receivedDate").value);

  if (isNaN(lpoDate) || isNaN(receivedDate)) {
    document.getElementById("result").innerText = "Sila isi kedua-dua tarikh.";
    return;
  }

  const tarikhAkhir = tambahHariBekerja(lpoDate, 7);
  const kelewatanHari = Math.max(0, Math.floor((receivedDate - tarikhAkhir) / (1000 * 60 * 60 * 24)));

  const resultText = `
    Tarikh LPO: ${lpoDate.toDateString()}<br>
    Tarikh Akhir Sepatutnya Hantar: ${tarikhAkhir.toDateString()}<br>
    Tarikh Terima: ${receivedDate.toDateString()}<br>
    👉 Kelewatan: <strong>${kelewatanHari} hari</strong>
  `;

  document.getElementById("result").innerHTML = resultText;
}

// Daftar Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/PWA---APPL-ETA/sw.js');
}
