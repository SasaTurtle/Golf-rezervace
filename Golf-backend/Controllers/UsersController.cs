using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Golf.Models;
using Microsoft.AspNetCore.Authorization;

namespace Golf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GolfContext _context;

        public UserController(GolfContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
          if (_context.User == null)
          {
              return NotFound();
          }

            return Ok(await _context.User.ToListAsync());
        }

        // GET: api/User/5
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.User == null)
          {
              return NotFound();
          }
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.User == null)
          {
              return Problem("Entity set 'GolfContext.User'  is null.");
          }
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.id }, user);
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/api/User/UserReservation")]
        public async Task<ActionResult<UserWithReservation>> PostUserReservation(UserWithReservation user)
        {
            User u = (User)user;
            if (_context.User == null)
            {
                return Problem("Entity set 'GolfContext.User'  is null.");
            }
            _context.User.Add(u);
            await _context.SaveChangesAsync();
            foreach(Reservation r in user.Reservation)
            {
                r.user_id = u.id;
                _context.Reservation.Add(r);
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUser", new { id = user.id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.User?.Any(e => e.id == id)).GetValueOrDefault();
        }


        [HttpPost("/api/Users/import")]
        public async Task<IActionResult> ImportUser(User[] users)
        {
            if (_context.User == null)
            {
                return Problem("Entity set 'GolfContext.User'  is null.");
            }

            foreach (User u in users)
            {
                _context.User.Add(u);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
