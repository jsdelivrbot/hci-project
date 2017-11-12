"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
// application variable should already be included in the app.js file
// Only do this on android
var application = require('application');
if (application.android) {
    application.android.on(application.AndroidApplication.activityBackPressedEvent, backEvent);
}
// This does the work on deciding if you want to go back
// arg.cancel = true will cancel navigating back
function backEvent(args) {
    //stop the back button
    args.cancel = true;
}
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBRTVFLDJDQUF5QztBQUd6QyxxRUFBcUU7QUFDckUsMEJBQTBCO0FBQzFCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0QixXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDN0YsQ0FBQztBQUVELHdEQUF3RDtBQUN4RCxnREFBZ0Q7QUFDaEQsbUJBQW1CLElBQUk7SUFDckIsc0JBQXNCO0lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLENBQUM7QUFDSCxzQ0FBMkIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxzQkFBUyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGlzIGltcG9ydCBzaG91bGQgYmUgZmlyc3QgaW4gb3JkZXIgdG8gbG9hZCBzb21lIHJlcXVpcmVkIHNldHRpbmdzIChsaWtlIGdsb2JhbHMgYW5kIHJlZmxlY3QtbWV0YWRhdGEpXG5pbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcblxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSBcIi4vYXBwLm1vZHVsZVwiO1xuXG5cbi8vIGFwcGxpY2F0aW9uIHZhcmlhYmxlIHNob3VsZCBhbHJlYWR5IGJlIGluY2x1ZGVkIGluIHRoZSBhcHAuanMgZmlsZVxuLy8gT25seSBkbyB0aGlzIG9uIGFuZHJvaWRcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJ2FwcGxpY2F0aW9uJyk7XG5pZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgYmFja0V2ZW50KTtcbiAgfVxuICBcbiAgLy8gVGhpcyBkb2VzIHRoZSB3b3JrIG9uIGRlY2lkaW5nIGlmIHlvdSB3YW50IHRvIGdvIGJhY2tcbiAgLy8gYXJnLmNhbmNlbCA9IHRydWUgd2lsbCBjYW5jZWwgbmF2aWdhdGluZyBiYWNrXG4gIGZ1bmN0aW9uIGJhY2tFdmVudChhcmdzKSB7XG4gICAgLy9zdG9wIHRoZSBiYWNrIGJ1dHRvblxuICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcbiAgfVxucGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7XG4iXX0=