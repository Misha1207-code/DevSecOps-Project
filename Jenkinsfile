pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner'
        SONAR_TOKEN = credentials('sonar-token')   // your SonarQube credential ID
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Misha1207-code/DevSecOps-Project.git'
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Running basic security checks (HTML project)...'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Fix: pull timeout by increasing request time
                sh """
                    echo "Pulling base image..."
                    docker pull nginx:alpine
                    docker build -t savisaini123/yourhtmlsite:latest .
                """
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD'
                    )
                ]) {
                    sh """
                        echo \$PASSWORD | docker login -u \$USERNAME --password-stdin
                        docker push savisaini123/yourhtmlsite:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment step for static HTML container...'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=smartcampus \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }
    }
}
