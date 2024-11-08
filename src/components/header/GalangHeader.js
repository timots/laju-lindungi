'use client';

import Link from 'next/link';

export default function GalangHeader() {
  return (
    <div className=' bg-gray-50 flex flex-col items-center px-4 mb-10 '>
      <div className='w-full max-w-md text-center space-y-6'>
        <h1 className='text-3xl font-bold text-blue-600'>Galang Dana di Lajupeduli.org</h1>

        <p className='text-gray-800'>
          Pihak yang dapat melakukan penggalangan dana di <span className='text-blue-600'>Lajupeduli.org</span> adalah komunitas, badan usaha, perorangan yang memiliki <span className='text-red-600'>tujuan mulia untuk membantu sesama</span>
          .
        </p>

        <p className='text-gray-800'>
          Setiap pihak yang mendaftarkan dirinya sebagai penggalang dana wajib menyertakan nomor rekening yang sah, surat-surat legalitas, dan kartu identitas penanggung jawab Setiap penggalan dana akan didaftarkan sebagai pengguna.
        </p>

        <p className='text-gray-800'>
          Setiap penggalangan dana akan di daftarkan sebagai pengguna <span className='text-blue-600'>Lajupeduli.org</span>
        </p>

        <div className='space-y-4 pt-4'>
          <Link
            href='/daftar'
            className='block w-full bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors'>
            Daftar
          </Link>

          <div className='text-gray-600'>Atau Sudah Punya Akun</div>

          <Link
            href='/masuk'
            className='block w-full bg-orange-500 text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-orange-600 transition-colors'>
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}
