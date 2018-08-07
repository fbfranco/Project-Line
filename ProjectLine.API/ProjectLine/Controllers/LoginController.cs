using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Persistence;
using ProjectLine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace ProjectLine.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        LoginRequestRepository loginRepository = new LoginRequestRepository();

        [HttpGet]
        [Route("echoping")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("echouser")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
        }

        [HttpPost]
        //[Route("api/Login/authenticate")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {
            if (login == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            var token = loginRepository.LoginAuthentication(login);
            //if ( token != null || !token.Equals(""))
            if (!token.Equals(""))
            {
                return Ok(token);
            }
            else
            {

                return Unauthorized();
            }
        }
    }
}
