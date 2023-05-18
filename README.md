# LoadWarden
LoadWarden is a server monitoring tool designed to prevent overload and server crashes. It constantly monitors server performance and sends alerts and warnings via webhook and email. LoadWarden also features an intelligent mechanism to automatically adjust the heartbeat monitor interval during overload situations.

# Installation
To get started with LoadWarden, follow these simple steps:

1. Clone the repository:

```bash
git clone https://github.com/ItzCrazyKns/LoadWarden.git
```
2. Install the required Node.js modules:

```bash
cd LoadWarden
npm install
```
3. Configure the settings:

Before running LoadWarden, you need to configure it according to your server and notification preferences. Follow these [steps](#configuration) to set up the necessary configuration:

4. Start the application using PM2:

```bash
npm start
```
This will automatically launch the LoadWarden process using PM2, ensuring it runs continuously.

5. Testing Emailer and Webhook
To ensure the proper functioning of the emailer and webhook configurations in LoadWarden, you can perform testing to verify that alerts and notifications are being sent correctly. Run the following command to test the emailer and webhook functionality:
```bash
npm test
```

# Configuration
Before running LoadWarden, you need to configure it according to your server and notification preferences. Follow these steps to set up the necessary configuration:

Open the `settings.js` file located in the project's root directory.

## Update the following settings:

- `interval`: Set the time interval (in milliseconds) after which the ServerStatus will be run again.
- `admin.email`: Set the email address where all the alerts will be sent.
- `webhook.link`: Set the URL of the webhook endpoint to receive alerts.
- `emailer.host`: Set the SMTP server for sending email notifications.
- `emailer.port`: Set the port number for the SMTP server.
- `emailer.auth`: Set the authentication details for the SMTP server.
- `emailer.from`: Set the email address from which the notifications will be sent.
- `cpuThreshold`: Set the CPU threshold (in percentage) for triggering alerts.
- `memoryThreshold`: Set the memory threshold (in percentage) for triggering alerts.
# Usage
LoadWarden will start monitoring your server as soon as it is launched. It will periodically check the server's load and respond accordingly. The heartbeat monitor interval is adjusted automatically during overload situations to prevent server crashes.

LoadWarden provides real-time alerts and warnings through webhook and email notifications. These notifications will be sent to the configured recipients whenever the server load exceeds the predefined CPU and memory thresholds.

# Contributing
We welcome contributions to improve LoadWarden and address any issues. To contribute, follow these steps:

- Fork the repository on GitHub.
- Create a new branch for your feature or bug fix.
- Make the necessary changes and commit them.
- Push your changes to your forked repository.
- Open a pull request against the main repository.
- Please ensure your code adheres to the project's style guidelines and includes appropriate tests.

# License
LoadWarden is open-source software licensed under the [MIT license](https://mit-license.org/). You are free to use, modify, and distribute this software as per the terms of the license.

# Acknowledgments
LoadWarden is inspired by the need for a robust server monitoring solution to prevent overload and crashes. We would like to express our gratitude to the open-source community for their invaluable contributions and support.

Please note that all the graphics and images used in this project belong to their respective owners. LoadWarden and its contributors do not claim any rights over them.
# Contact
If you have any questions, suggestions, or feedback, feel free to reach out to us at our [Discord Server](soon™️
)

Happy monitoring with LoadWarden!
