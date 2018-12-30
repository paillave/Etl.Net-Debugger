using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using Paillave.Etl.Core;
using Paillave.Etl.Core.Streams;
using Paillave.Etl.Extensions;

namespace Paillave.Etl.Debugger.Coordinator
{
    public interface IEtlNetContext
    {
        List<ProcessDescription> Processes { get; }
        JobDefinitionStructure GetJobDefinitionStructure(string className, string @namespace, string streamTransformationName);
        Task<ExecutionStatus> ExecuteAsync(string className, string @namespace, string streamTransformationName, Dictionary<string, string> parameters, Action<TraceEvent> processTraceEvent);
    }
}