import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';

const InvoiceDetails = () => {
  // Matching the exact structure from the Stripe response
  const targetRef = useRef();
  const data = {
    status: true,
    data: {
      invoice: {
        id: 'in_1Qrw9YGrPQAlpFPyFOYUzb1t',
        object: 'invoice',
        account_country: 'SG',
        account_name: 'EDRUS ECOSYSTEM PTE. LTD.',
        amount_due: 3000000,
        amount_paid: 3000000,
        amount_remaining: 0,
        amount_shipping: 0,
        charge: 'ch_3Qrw9bGrPQAlpFPy1XWQt4D2',
        collection_method: 'send_invoice',
        created: 1739429044,
        currency: 'idr',
        customer_email: 'arifarends@gmail.com',
        customer_name: 'Ari Yanto',
        customer_phone: '089649222058',
        due_date: 1742021044,
        number: 'BBC11538-0001',
        status: 'paid',
        subtotal: 3000000,
        tax: null,
        total: 3000000,
        lines: {
          object: 'list',
          data: [
            {
              id: 'il_1Qrw9ZGrPQAlpFPyJbxtPi3b',
              amount: 3000000,
              currency: 'idr',
              description:
                'Bright Futures: A Hope for Orphans & Less Fortunate Children Indonesia - Nominal 1',
              quantity: 1,
            },
          ],
          has_more: false,
          total_count: 1,
        },
      },
      charge: {
        id: 'ch_3Qrw9bGrPQAlpFPy1XWQt4D2',
        payment_method_details: {
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025,
          },
        },
        receipt_number: '2246-2859',
        status: 'succeeded',
      },
    },
  };

  const formatCurrency = (amount, currency) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const options = {
    // default is `save`
    method: 'save',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'letter',
      // default is 'portrait'
      orientation: 'landscape',
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/png',
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };

  const { invoice, charge } = data.data;
  const getTargetElement = () => document.getElementById('content-id');

  return (
    <div>
      <button onClick={() => generatePDF(getTargetElement, options)}>
        Generate PDF
      </button>
      <div id="content-id" className="min-h-screen bg-white">
        <div className="max-w-[210mm] mx-auto p-8 bg-white">
          {/* Company Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">{invoice.account_name}</h1>
            <div className="text-sm text-gray-600">
              <p>{invoice.account_country}</p>
            </div>
          </div>

          {/* Invoice Title */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold">INVOICE</h2>
            <p className="text-gray-600">#{invoice.number}</p>
          </div>

          {/* Bill To & Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{invoice.customer_name}</p>
                <p>Email: {invoice.customer_email}</p>
                <p>Phone: {invoice.customer_phone}</p>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">Invoice Date:</span>
                <span>{formatDate(invoice.created)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Due Date:</span>
                <span>{formatDate(invoice.due_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-green-600 font-medium capitalize">
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-gray-200">
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lines.data.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4">{item.description}</td>
                    <td className="py-4 text-right">
                      {formatCurrency(item.amount, item.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="ml-auto w-64 text-sm">
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Tax:</span>
              <span>
                {invoice.tax
                  ? formatCurrency(invoice.tax, invoice.currency)
                  : 'IDR 0'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 font-semibold">
              <span>Total:</span>
              <span>{formatCurrency(invoice.total, invoice.currency)}</span>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-2">Payment Information</h3>
            <div className="text-sm space-y-1">
              <p>
                Payment Method: {charge.payment_method_details.card.brand} card
                ending in {charge.payment_method_details.card.last4}
              </p>
              <p>Payment Status: {charge.status}</p>
              <p>Receipt Number: {charge.receipt_number}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 text-center text-sm text-gray-600">
            <p>Thank you for your business!</p>
          </div>

          {/* Page Information */}
          <div className="mt-8 pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200">
            <div>
              <p>Created: {formatDate(invoice.created)}</p>
              <p>Invoice ID: {invoice.id}</p>
            </div>
            <div className="text-right">
              <p>Page 1 of 1</p>
              <p>Generated by {invoice.account_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
