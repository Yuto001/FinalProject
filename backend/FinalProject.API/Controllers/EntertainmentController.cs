using FinalProject.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainmentController : ControllerBase
    {
        private EntertainmentAgencyExampleDbContext _entertainmentContext;
        public EntertainmentController(EntertainmentAgencyExampleDbContext temp) => _entertainmentContext = temp;

        [HttpGet("AgentsWithStats")]
        public IActionResult GetAgentsWithStats()
        {
            var data = from agent in _entertainmentContext.Agents
                       join engagement in _entertainmentContext.Engagements
                           on agent.AgentId equals engagement.AgentId into agentEngagements
                       from engagement in agentEngagements.DefaultIfEmpty()
                       group engagement by new
                       {
                           agent.AgentId,
                           agent.AgtFirstName,
                           agent.AgtLastName,
                           agent.AgtPhoneNumber
                       }
                       into g
                       select new
                       {
                           AgentId = g.Key.AgentId,
                           FirstName = g.Key.AgtFirstName,
                           LastName = g.Key.AgtLastName,
                           PhoneNumber = g.Key.AgtPhoneNumber,
                           BookingCount = g.Count(e => e != null),
                           LastBookingDate = g.Max(e => e != null ? e.StartDate : null)
                       };

            return Ok(data.ToList());
        }


        [HttpGet("Agents")]
        public IEnumerable<Agent> GetAgents()
        {
            return _entertainmentContext.Agents.ToList();
        }

        [HttpGet("EntertainersWithStats")]
        public IActionResult GetEntertainersWithStats()
        {
            var data = from e in _entertainmentContext.Entertainers
                       join g in _entertainmentContext.Engagements
                           on e.EntertainerId equals g.EntertainerId into eg
                       from g in eg.DefaultIfEmpty()
                       group g by new
                       {
                           e.EntertainerId,
                           e.EntStageName
                       } into grouped
                       select new
                       {
                           EntertainerId = grouped.Key.EntertainerId,
                           StageName = grouped.Key.EntStageName,
                           BookingCount = grouped.Count(x => x != null),
                           LastBookingDate = grouped.Max(x => x != null ? x.StartDate : null)
                       };

            return Ok(data.ToList());
        }


        // 2. Get full details by ID
        [HttpGet("Entertainers/{id}")]
        public IActionResult GetEntertainerById(int id)
        {
            var entertainer = _entertainmentContext.Entertainers.Find(id);
            if (entertainer == null) return NotFound();
            return Ok(entertainer);
        }

        // 3. Add entertainer
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEnt)
        {
            _entertainmentContext.Entertainers.Add(newEnt);
            _entertainmentContext.SaveChanges();
            return Ok(newEnt);
        }

        // 4. Update entertainer
        [HttpPut("UpdateEntertainer/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updated)
        {
            var existing = _entertainmentContext.Entertainers.Find(id);
            if (existing == null) return NotFound();

            existing.EntStageName = updated.EntStageName;
            existing.EntSsn = updated.EntSsn;
            existing.EntStreetAddress = updated.EntStreetAddress;
            existing.EntCity = updated.EntCity;
            existing.EntState = updated.EntState;
            existing.EntZipCode = updated.EntZipCode;
            existing.EntPhoneNumber = updated.EntPhoneNumber;
            existing.EntWebPage = updated.EntWebPage;
            existing.EntEmailAddress = updated.EntEmailAddress;
            existing.DateEntered = updated.DateEntered;

            _entertainmentContext.Entertainers.Update(existing);
            _entertainmentContext.SaveChanges();

            return Ok(existing);
        }

        // 5. Delete entertainer
        [HttpDelete("DeleteEntertainer/{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var entertainer = _entertainmentContext.Entertainers.Find(id);
            if (entertainer == null) return NotFound();

            _entertainmentContext.Entertainers.Remove(entertainer);
            _entertainmentContext.SaveChanges();

            return NoContent();
        }





    }
}
