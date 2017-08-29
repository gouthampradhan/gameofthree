# Game of Three

Game of three is a two player game where the players exchange a whole number between them.
To begin with a player_1 starts by sending a random whole number to player_2. The player_2 either adds [1, 0 or -1]
to the whole number inorder to get to a number which is divisible by 3 and the resulting number is passed back to the
player_1. The player_1 repeats the same steps and send the number back to player_2. This will continue until either of
the player gets to number 1 either by adding any of [1, 0 or -1]. The first player to reach 1 will be considered
as the winner.

Goal of this project is to demonstrate how we can use Spring STOMP over Websockets to exchange private messages
between user.

## Getting Started

Follow the instructions below to setup and build the project in our local machine.

### Prerequisites

This project is build using the below tools. Please ensure you have the below prerequisites satisfied

```
1. JDK 1.8 or above
2. Gradle 4.1
```

### Installing

Clone and run the project using below commands.
```
git clone https://github.com/gouthampradhan/gameofthree.git

```
If you are using a IDE for example Intellij then, import project and choose build.gradle file.

### Running

Use the below command to build the project and run from the project root directory.
The project will build and run in a embedded tomcat instance.

```
./gradlew bootRun

```

If the build is successfull then you should see something like this in the console

```
2017-08-30 00:08:45.713  INFO 34186 --- [           main] o.s.j.e.a.AnnotationMBeanExporter        : Registering beans for JMX exposure on startup
2017-08-30 00:08:45.723  INFO 34186 --- [           main] o.s.c.support.DefaultLifecycleProcessor  : Starting beans in phase 2147483647
2017-08-30 00:08:45.723  INFO 34186 --- [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : Starting...
2017-08-30 00:08:45.724  INFO 34186 --- [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : BrokerAvailabilityEvent[available=true, SimpleBrokerMessageHandler [DefaultSubscriptionRegistry[cache[0 destination(s)], registry[0 sessions]]]]
2017-08-30 00:08:45.726  INFO 34186 --- [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : Started.
2017-08-30 00:08:45.815  INFO 34186 --- [           main] s.b.c.e.t.TomcatEmbeddedServletContainer : Tomcat started on port(s): 8080 (http)
```


### How to use the application?

To check and ensure everything works as expected, open a browser window and hit the below url.

```
http://localhost:8080/login

```

You should see a login page prompting for user and password.

The project has pre-configured, in-memory user_name and password set as shown below.

```
http://localhost:8080/login

```

| User | Password |
| --- | --- |
| admin | password |
| user | password |

1. Use the login credentials admin/password to login as player_1
2. To simulate two player please open ANOTHER browser window and NOT another tab
3. Now in the other browser window again hit the above login url and now login with the credentials user/password
4. admin is configured to have ROLE_ADMIN privilege and only he can initiate the game and the 'Play' button
 is available only to admin user.
5. Click on Play and you can see the game results on the screen.


