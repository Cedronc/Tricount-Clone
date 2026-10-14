# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0.426 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "TricountBackend.csproj"
RUN dotnet build "TricountBackend.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "TricountBackend.csproj" -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=publish /app/publish .

# Environment Variables
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

# Expose Port
EXPOSE 80
EXPOSE 443

# Entry Point
ENTRYPOINT ["dotnet", "TricountBackend.dll"]
