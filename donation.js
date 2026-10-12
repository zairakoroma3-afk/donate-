
(function(){
  const amountInput = document.getElementById('donationAmount');
  const purposeInput = document.getElementById('donationPurpose');
  const reviewButton = document.getElementById('reviewDonation');
  const summary = document.getElementById('donationSummary');
  const summaryAmount = document.getElementById('summaryAmount');
  const summaryPurpose = document.getElementById('summaryPurpose');

  function formatAmount(value){
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  }

  reviewButton?.addEventListener('click', function(){
    const formatted = formatAmount(amountInput?.value);
    if (!formatted) {
      amountInput?.focus();
      alert('Please enter a donation amount greater than $0.');
      return;
    }

    const purpose = purposeInput?.value || 'General Donation';

    if (summaryAmount) summaryAmount.textContent = formatted;
    if (summaryPurpose) summaryPurpose.textContent = purpose;
    if (summary) summary.hidden = false;

    summary?.scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  document.querySelectorAll('[data-copy]').forEach(function(button){
    button.addEventListener('click', async function(){
      const text = button.getAttribute('data-copy') || '';
      try {
        await navigator.clipboard.writeText(text);
        const original = button.textContent;
        button.textContent = 'COPIED';
        setTimeout(() => button.textContent = original, 1600);
      } catch (e) {
        window.prompt('Copy this Zelle number:', text);
      }
    });
  });
})();
