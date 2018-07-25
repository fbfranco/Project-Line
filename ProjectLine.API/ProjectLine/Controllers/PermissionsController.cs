using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ProjectLine.CORE.Models;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Persistence;

namespace ProjectLine.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class PermissionsController : ApiController
    {
        PermissionsRepository Repository = new PermissionsRepository();

        // GET: api/Permissions
        public async Task<IEnumerable<Permission>> GetPermissions()
        {
            var permission = await Repository.GetPermissions();
            return permission;
        }

    }
}