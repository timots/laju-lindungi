import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';

const InvoiceDetails = () => {
  const [dataInvoice, setDataInvoice] = useState(null);
  const params = useParams();

  const getInvoiceDetail = async (id) => {
    try {
      const response = await axios.post('/api/public/payment/get-invoice', {
        orderId: id,
        isProduction: false,
      });
      setDataInvoice(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatCurrency = (amount, currency) => {
    // Divide amount by 100 to remove 2 zeros
    const adjustedAmount = amount / 100;
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(adjustedAmount);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if (params?.id) {
      getInvoiceDetail(params.id);
    }
  }, [params?.id]);

  if (!dataInvoice) {
    return <div>Loading ...</div>;
  }

  const { invoice, charge } = dataInvoice;

  const options = {
    method: 'save',
    resolution: Resolution.MEDIUM,
    page: {
      margin: Margin.SMALL,
      format: 'A4',
    },
    canvas: {
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
    filename: `${invoice.number}-${invoice.customer_name}`,
  };

  const getTargetElement = () => document.getElementById('content-id');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[210mm] mx-auto p-8">
        <div id="content-id" className="bg-white shadow-sm">
          <div className="p-8">
            {/* Company Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">SYNERGY HUMANITY</h1>
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
                <span>
                  {formatCurrency(invoice.subtotal, invoice.currency)}
                </span>
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
                  Payment Method: {charge.payment_method_details.card.brand}{' '}
                  card ending in {charge.payment_method_details.card.last4}
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
                <p>Generated by Synergy Humanity</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 mb-8">
          <Button
            onClick={() => generatePDF(getTargetElement, options)}
            className="hover:bg-blue-700"
          >
            Print Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
