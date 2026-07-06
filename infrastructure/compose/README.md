# Local Compose Runtime

This directory will contain the approved local Compose definitions for the ECHELON applications and infrastructure dependencies.

Requirements:

- Use OrbStack on macOS where available.
- Retain Docker Desktop compatibility.
- Bind services to loopback by default.
- Use Apple Silicon compatible images.
- Do not mount host Docker sockets, home directories, or production secrets.
- Add services only with documented health checks, resource limits, and rollback guidance.
