# Task_Planner
 A small task planner written in JavaScript, HTML, CSS.

***

## Deploy the task planner FRONTEND application on a Raspberry Pi
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

## Configuration of the task planner BACKEND application
The backend application acts as a middleware between an underlying database and the frontend.  
Parallel to the file app.js create a file .env with the database configuration as follows:  
	DB_CONNECTION=mongodb+srv://username:password@host/dbname  
  
For example the MongoDB Atlas service can be used, which hosts a MongoDB in the cloud. It is very easy to use and there are free options. [2]

***

## Deploy the task planner BACKEND application on a Raspberry Pi
The application will be deployed in a Docker Container on the Raspberry Pi. Docker running on the Raspberry Pi is a prerequisite for the next steps. A general guide how to deploy a a Node.js application in a Docker Container can be found in the official Node.js documentation [3].

1. Create a folder on the Raspberry Pi, e.g. /opt/task_planner  
	cd /opt  
	sudo mkdir task_planner  
	sudo chown pi task_planner/  
2. Copy everything from folder Server of the Git repository to the folder task_planner on the Raspberry Pi.  
3. Build the Docker image  
	docker build -t task_planner .  
4. Start the Docker Container  
	docker run -d --name task_planner -p 3000:3000 --restart always task_planner  
  
docker run: command for starting a new Docker container  
-d: run as a daemon  
--name task_planner: gives the Docker container the name "task_planner"  
-p 3000:3000: exposes and publishes the port 3000, so that the application inside the container can be reached via port 3000 from outside of the coontainer.
task_planner: the name of the Docker image  

***

### Links:
[1] https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md  
[2] https://www.mongodb.com/cloud/atlas  
[3] https://nodejs.org/en/docs/guides/nodejs-docker-webapp/  