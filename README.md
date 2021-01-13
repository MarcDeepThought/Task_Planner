# Task_Planner
 A small task planner written in JavaScript, HTML, CSS.

***

## Deploy the task planner application on a Raspberry Pi
My task planner is running on a Raspberry Pi in my local network, so that the application is accessible from my PC and my mobile phone. In order to serve the application on the Raspberry Pi an Apache web server has to be installed. The detailed instructions can be found in [1].

1. Make sure you have installed the latest packages.
	sudo apt upgrade
	sudo apt update
2. Install the apache
	sudo apt install apache2 -y
3. Change is the user rights:
	cd /var/www/
	sudo chown pi index -R
4. Copy the application on the Raspberry Pi to the following folder:
	/var/www/html/

***

###Links:
[1] https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md