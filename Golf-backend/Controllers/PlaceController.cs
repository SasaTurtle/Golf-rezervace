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
    public class PlaceController : ControllerBase
    {
        private readonly GolfContext _context;

        public PlaceController(GolfContext context)
        {
            _context = context;
        }

        // GET: api/Place
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlace()
        {
          if (_context.Place == null)
          {
              return NotFound();
          }
            return Ok(await _context.Place.ToListAsync());
        }

        // GET: api/Place/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Place>> GetPlace(int id)
        {
          if (_context.Place == null)
          {
              return NotFound();
          }
            var Place = await _context.Place.FindAsync(id);

            if (Place == null)
            {
                return NotFound();
            }

            return Place;
        }

        // PUT: api/Place/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlace(int id, Place Place)
        {
            if (id != Place.id)
            {
                return BadRequest();
            }

            _context.Entry(Place).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
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

        // POST: api/Place
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Place>> PostPlace(Place place)
        {
          if (_context.Place == null)
          {
              return Problem("Entity set 'GolfContext.Place'  is null.");
            }

            
            _context.Place.Add(place);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PlaceExists(place.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPlace", new { id = place.id }, place);
        }

        // DELETE: api/Place/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            if (_context.Place == null)
            {
                return NotFound();
            }
            var Place = await _context.Place.FindAsync(id);
            if (Place == null)
            {
                return NotFound();
            }

            _context.Place.Remove(Place);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlaceExists(int id)
        {
            return (_context.Place?.Any(e => e.id == id)).GetValueOrDefault();
        }

        [HttpPost("/api/place/import")]
        public async Task<IActionResult> ImportPlace(Place[] places)
        {
            if (_context.Place == null)
            {
                return Problem("Entity set 'GolfContext.Place'  is null.");
            }

            foreach (Place u in places)
            {
                _context.Place.Add(u);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
