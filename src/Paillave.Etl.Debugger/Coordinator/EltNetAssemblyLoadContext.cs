using System.Reflection;
using System.Runtime.Loader;

namespace Paillave.Etl.Debugger.Coordinator
{
    public class EltNetAssemblyLoadContext : AssemblyLoadContext
    {
        public EltNetAssemblyLoadContext()
        {
        }

        protected override Assembly Load(AssemblyName assemblyName)
        {
            
            throw new System.NotImplementedException();
        }
    }
}