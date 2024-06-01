using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Golf.Models;

namespace Golf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentHistoryController : ControllerBase
    {
        private readonly GolfContext _context;

        public PaymentHistoryController(GolfContext context)
        {
            _context = context;
        }

        // GET: api/PaymentHistory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentHistory>>> GetPaymentHistory()
        {
          if (_context.PaymentHistory == null)
          {
              return NotFound();
          }
            return Ok(await _context.PaymentHistory.ToListAsync());
        }

        // GET: api/PaymentHistory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentHistory>> GetPaymentHistory(int id)
        {
          if (_context.PaymentHistory == null)
          {
              return NotFound();
          }
            var payment_history = await _context.PaymentHistory.FindAsync(id);

            if (payment_history == null)
            {
                return NotFound();
            }

            return payment_history;
        }

        // PUT: api/PaymentHistory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentHistory(int id, PaymentHistory paymentHistory)
        {
            if (id != paymentHistory.id)
            {
                return BadRequest();
            }

            _context.Entry(paymentHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentHistoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PaymentHistory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentHistory>> PostPaymentHistory(PaymentHistory paymentHistory)
        {
          if (_context.PaymentHistory == null)
          {
              return Problem("Entity set 'GolfContext.PaymentHistory' is null.");
          }
            _context.PaymentHistory.Add(paymentHistory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PaymentHistoryExists(paymentHistory.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPaymentHistory", new { id = paymentHistory.id }, paymentHistory);
        }

        // DELETE: api/PaymentHistory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentHistory(int id)
        {
            if (_context.PaymentHistory == null)
            {
                return NotFound();
            }
            var paymentHistory = await _context.PaymentHistory.FindAsync(id);
            if (paymentHistory == null)
            {
                return NotFound();
            }

            _context.PaymentHistory.Remove(paymentHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentHistoryExists(int id)
        {
            return (_context.PaymentHistory?.Any(e => e.id == id)).GetValueOrDefault();
        }

        [HttpPost("/api/paymenthistory/import")]
        public async Task<IActionResult> ImportPaymentHistory(PaymentHistory[] paymentHistories)
        {
            if (_context.PaymentHistory == null)
            {
                return Problem("Entity set 'GolfContext.PaymentHistory'  is null.");
            }

            foreach (PaymentHistory u in paymentHistories)
            {
                _context.PaymentHistory.Add(u);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
