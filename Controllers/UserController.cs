using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<ToDoController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly JwtOptions _jwtOptions;
        private readonly SignInManager<IdentityUser> _signInManager;

        public UserController(
            ILogger<ToDoController> logger,
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager,
            IOptions<IdentityOptions> identityOptions,
            IOptions<JwtOptions> jwtOptions,
            SignInManager<IdentityUser> signInManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;
            _identityOptions = identityOptions;
            _jwtOptions = jwtOptions.Value;
            _signInManager = signInManager;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody]User userModel)
        {
            var user = await _userManager.FindByNameAsync(userModel.Username);
            if (user != null)
            {
                return BadRequest(new
                {
                    error = "This user already exists."
                });
            }
            else
            {
                IdentityUser newUser = new IdentityUser();
                newUser.UserName = userModel.Username;
                //newUser.Email = userModel.Email;

                IdentityResult result = _userManager.CreateAsync(newUser, userModel.Password).Result;

                if (result.Succeeded)
                {
                    _userManager.AddToRoleAsync(newUser, "User").Wait();
                    return await Login(userModel);
                }
            }

            return BadRequest(new
            {
                error = "Sorry, an error occurred."
            });
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]User userModel)
        {
            // Ensure the username and password is valid.
            var user = await _userManager.FindByNameAsync(userModel.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, userModel.Password))
            {
                return BadRequest(new
                {
                    error = "", //OpenIdConnectConstants.Errors.InvalidGrant,
                    error_description = "The username or password is invalid."
                });
            }

            // Ensure the email is confirmed.
            /*if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return BadRequest(new
                {
                    error = "email_not_confirmed",
                    error_description = "You must have a confirmed email to log in."
                });
            }*/


            _logger.LogInformation($"User logged in (id: {user.Id})");

            // Generate and issue a JWT token
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.UserName));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              issuer: _jwtOptions.Issuer,
              audience: _jwtOptions.Issuer,
              claims: claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
    }
}
