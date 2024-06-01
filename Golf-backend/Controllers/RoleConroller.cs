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
    public class RoleController : ControllerBase
    {
        private readonly GolfContext _context;

        public RoleController(GolfContext context)
        {
            _context = context;
        }

        // GET: api/Role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> GetRole()
        {
          if (_context.Role == null)
          {
              return NotFound();
          }
            return Ok(await _context.Role.ToListAsync());
        }

        // GET: api/Role/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetRole(int id)
        {
          if (_context.Role == null)
          {
              return NotFound();
          }
            var Role = await _context.Role.FindAsync(id);

            if (Role == null)
            {
                return NotFound();
            }

            return Role;
        }

        // PUT: api/Role/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRole(int id, Role Role)
        {
            if (id != Role.id)
            {
                return BadRequest();
            }

            _context.Entry(Role).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
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

        // POST: api/Role
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Role>> PostRole(Role Role)
        {
          if (_context.Role == null)
          {
              return Problem("Entity set 'GolfContext.Role'  is null.");
          }
            _context.Role.Add(Role);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RoleExists(Role.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRole", new { id = Role.id }, Role);
        }

        // DELETE: api/Role/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            if (_context.Role == null)
            {
                return NotFound();
            }
            var Role = await _context.Role.FindAsync(id);
            if (Role == null)
            {
                return NotFound();
            }

            _context.Role.Remove(Role);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleExists(int id)
        {
            return (_context.Role?.Any(e => e.id == id)).GetValueOrDefault();
        }

        [HttpPost("/api/role/import")]
        public async Task<IActionResult> ImportRole(Role[] roles)
        {
            if (_context.Role == null)
            {
                return Problem("Entity set 'GolfContext.Role'  is null.");
            }

            foreach (Role r in roles)
            {
                _context.Role.Add(r);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
