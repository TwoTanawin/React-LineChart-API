using Microsoft.AspNetCore.Mvc;
using System;

namespace RandomNumberAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RandomNumberController : ControllerBase
    {
        [HttpGet]
        public ActionResult<int> GetRandomNumber()
        {
            var random = new Random();
            int randomNumber = random.Next(0, 101); // Generates a number between 0 and 100 (inclusive)
            return Ok(randomNumber);
        }
    }
}
