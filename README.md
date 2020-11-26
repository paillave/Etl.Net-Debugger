# :warning: This project is discontinued. 

The goal is not to abandon it. In some months **a cross platform visual ETL will start to be developed** using [Etl.Net](https://github.com/paillave/Etl.Net) as the execution engine. The goal is to have, at the end of the day, a **FULL** open source ETL with never seen features, dramatically easy to extend and... cherry on the cake... that will be permit developers **to integrate the designer into their react/dotnet core web applications!**


# Etl.Net Debugger [![Join the chat at https://gitter.im/Etl-Net/Lobby](https://badges.gitter.im/Etl-Net/Lobby.svg)](https://gitter.im/Etl-Net/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Tools to debug Etl.Net processes.

[Download](https://github.com/paillave/Etl.Net-Debugger/releases)

For more details about Etl.Net, follow this project:  https://paillave.github.io/Etl.Net [![NuGet](https://img.shields.io/nuget/v/Etl.Net.svg)](https://www.nuget.org/packages/Etl.Net) [![NuGet](https://img.shields.io/nuget/dt/Etl.Net.svg)](https://www.nuget.org/packages/Etl.Net)

## Development status :construction:

> [!WARNING]
> This tool is still under development, don't use it for production purpose yet as it may not behave correctly.

## Features

- View the list of process descriptions in an assembly
- View the detailed description of a process
- Execute a process by providing its input values
- View rows issued by each node of the process
- View the detail of a row issued by a node of the process

> [!NOTE]
> New requests are very welcome in the issue section

## How to use Etl.Net Debugger

### Open the application `electron.net.host.exe`

The application takes a little while to open and there is no splash screen at the moment. It shows an empty screen awaiting the user to select a process.

![Debugger](./README/Capture1.PNG "Debugger")

### Click on `SELECT PROCESS`

This will show a form for the user to select an assembly and a process.
![Debugger](./README/Capture2.PNG "Debugger")

### Drag and drop the assembly that contains the process on the dedicated area

This will show the list of processes contained in the selected assembly.
> [!NOTE]
> Processes must be static methods with this signature:
> ``` CSharp
> public static void AnyMethodName(ISingleStream<AnyClassType> rootStream)
> ```

![Debugger](./README/Capture3.PNG "Debugger")

### Click on the process that must be executed or verified

This will show the detailed structure of the selected process.
![Debugger](./README/Capture4.PNG "Debugger")

### Click on `RUN` (the play icon at the right of `SELECT PROCESS`)

This will show a form were values of properties of the input config type can be given.

> [!NOTE]
> Type that are not natively serializable in .net will cause a failure for execution. To run such a process, create a dedicated process that wraps this process.

![Debugger](./README/Capture5.PNG "Debugger")

### Click on `EXECUTE`

This will run the process by providing real time evolution of the process. The quantity of rows issued by each node will impact the thickness of the matching stream representation.

> [!NOTE]
> Errors in the process execution are not properly handled yet in this version.

![Debugger](./README/Capture6.PNG "Debugger")

### Click on a node

This will show the list of events issued by this node, including issued rows.

![Debugger](./README/Capture7.PNG "Debugger")

### Click on a row

This will show the detail of the trace (including the content of the issued row).

![Debugger](./README/Capture8.PNG "Debugger")
