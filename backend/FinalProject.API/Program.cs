using FinalProject.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EntertainmentAgencyExampleDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainmentConnection")));

builder.Services.AddCors(options =>

    options.AddPolicy("AllowReactAppBlah",
       policy =>
       {
           policy.WithOrigins("http://localhost:3000")
           //.AllowCredentials()
           .AllowAnyHeader()
           .AllowAnyMethod();
       }));

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactAppBlah");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
