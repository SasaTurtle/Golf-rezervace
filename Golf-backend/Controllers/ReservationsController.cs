using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Golf.Models;
using Microsoft.AspNetCore.Authorization;
using Azure.Identity;
using System.Collections;
using Golf.Servises;

namespace Golf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly GolfContext _context;

        public ReservationController(GolfContext context)
        {
            _context = context;
        }

        // GET: api/Reservation
        [HttpGet, Route("rezervace"), Authorize]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationUser()
        {
          if (_context.Reservation == null)
          {
              return NotFound();
          }
            UserToken user = new Utils().GetUserNameFromContext(HttpContext.User);
            return Ok(await _context.Reservation.Where(t => t.user_id ==user.id).OrderByDescending(a => a.from).ToListAsync());
        }

        [HttpGet,]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservation()
        {
            if (_context.Reservation == null)
            {
                return NotFound();
            }
            return Ok(await _context.Reservation.ToListAsync());
        }

        // POST: api/Reservation
        [HttpPost, Route("params"), Authorize]
        public async Task<ActionResult<IEnumerable<ReservationResponse>>> GetReservationWithParams(ReservationRequest reservationRequest)
        {
            List<ReservationResponse> reservationResponsesList = new List<ReservationResponse>();
           
            UserToken user = new Utils().GetUserNameFromContext(HttpContext.User);
            
            if (_context.Reservation == null)
            {
                return NotFound();
            }
            DateTime from = DateTime.Parse(reservationRequest.from);
            DateTime to = DateTime.Parse(reservationRequest.to);
            foreach(Reservation reservation in _context.Reservation.Where(t => t.from > from && t.to < to).ToList()) 
            {
                string color = String.Empty;
                if (user.id != reservation.user_id) color = "#cdcdcd";
                reservationResponsesList.Add(new ReservationResponse(reservation.title,reservation.from?.ToString("yyyy-MM-ddTHH:mm:ss"),reservation.to?.ToString("yyyy-MM-ddTHH:mm:ss"),color, reservation.id));
            }
            return Ok(reservationResponsesList);
        }

        // POST: api/Reservation
        [HttpPost, Route("all"), AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ReservationResponse>>> GetReservationWithAll(ReservationRequest reservationRequest)
        {
            List<ReservationResponse> reservationResponsesList = new List<ReservationResponse>();

            if (_context.Reservation == null)
            {
                return NotFound();
            }
            DateTime from = DateTime.Parse(reservationRequest.from);
            DateTime to = DateTime.Parse(reservationRequest.to);
            foreach (Reservation reservation in _context.Reservation.Where(t => t.from > from && t.to < to).ToList())
            {
                string color = String.Empty;
                color = "#cdcdcd";
                reservationResponsesList.Add(new ReservationResponse(reservation.title, reservation.from?.ToString("yyyy-MM-ddTHH:mm:ss"), reservation.to?.ToString("yyyy-MM-ddTHH:mm:ss"), color, reservation.id));
            }
            return Ok(reservationResponsesList);
        }

        // GET: api/Reservation/5
        [HttpGet("{id}"),Authorize]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
          if (_context.Reservation == null)
          {
              return NotFound();
          }
            UserToken user = new Utils().GetUserNameFromContext(HttpContext.User);

            //var reservation = _context.Reservation.Where(t => t.id == id && t.user_id == user.id).First();
            var reservation = await _context.Reservation.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // PUT: api/Reservation/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            UserToken user = new Utils().GetUserNameFromContext(HttpContext.User);
            reservation.user_id = user.id;

            if (id != reservation.id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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

        // POST: api/Reservation
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
          if (_context.Reservation == null)
          {
              return Problem("Entity set 'GolfContext.Reservation'  is null.");
          }

            UserToken user = new Utils().GetUserNameFromContext(HttpContext.User);
            reservation.user_id = user.id;

            _context.Reservation.Add(reservation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReservationExists(reservation.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetReservation", new { id = reservation.id }, reservation);
        }

        // DELETE: api/Reservation/5
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (_context.Reservation == null)
            {
                return NotFound();
            }
            UserToken user = new Utils().GetUserNameFromContext(HttpContext.User);

            var reservation =  _context.Reservation.Where(t => t.id == id && t.user_id == user.id).First();//.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservation.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return (_context.Reservation?.Any(e => e.id == id)).GetValueOrDefault();
        }

        [HttpPost("/api/reservaation/import")]
        public async Task<IActionResult> ImportReservation(Reservation[] reservations)
        {
            if (_context.Reservation == null)
            {
                return Problem("Entity set 'GolfContext.Reservation'  is null.");
            }

            foreach (Reservation u in reservations)
            {
                _context.Reservation.Add(u);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
