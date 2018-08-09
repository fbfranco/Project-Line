using ProjectLine.CORE.ViewModel;
using ProjectLine.DATA.Config;
using ProjectLine.DATA.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ProjectLine.DATA.Persistence
{
    public class LoginRequestRepository
    {
        private ProjectLineContext Context;
        public string LoginAuthentication(LoginRequest credentials)
        {
            return Hash(credentials) ? TokenGenerator.GenerateTokenJwt(credentials.Email) : "";
        }
        public bool Hash(LoginRequest credentials)
        {

            using (Context = new ProjectLineContext())
            {
                try
                {
                    var equal = true;
                    /* Fetch the stored value */
                    //string savedPasswordHash = Context.Users.Where(u => u.Email == credentials.Email).Select(u => u.Password).First();
                    string savedPasswordHash = Context.Users.Where(u => u.Email == credentials.Email && u.Active == true).Select(u => u.Password).First();
                    /* Extract the bytes */
                    byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
                    /* Get the salt */
                    byte[] salt = new byte[16];
                    Array.Copy(hashBytes, 0, salt, 0, 16);
                    /* Compute the hash on the password the user entered */
                    var pbkdf2 = new Rfc2898DeriveBytes(credentials.Password, salt, 10000);
                    byte[] hash = pbkdf2.GetBytes(20);
                    /* Compare the results */
                    for (int i = 0; i < 20; i++)
                    {
                        if (hashBytes[i + 16] != hash[i])
                        {
                            equal = false;
                        }
                    }
                    return equal;
                }
                catch (Exception)
                {
                    return false;
                }

            }
        }
    }
}
