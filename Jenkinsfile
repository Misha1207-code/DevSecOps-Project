pipeline {
    agent any

    environment {
        JAVA_HOME = "C:\\Users\\LENOVO\\AppData\\Local\\Programs\\Eclipse Adoptium\\jdk-17.0.16.8-hotspot"
        PATH = "${env.JAVA_HOME}\\bin;${env.PATH}"
        SCANNER_HOME = tool 'SonarScanner'
    }

    stages {

        /* --------- CHECKOUT CODE --------- */
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Misha1207-code/DevSecOps-Project.git'
            }
        }

        /* --------- BASIC CODE ANALYSIS --------- */
        stage('Code Analysis') {
            steps {
                echo 'Running basic security checks (HTML project)...'
            }
        }

        /* --------- BUILD DOCKER IMAGE --------- */
        stage('Build Docker Image') {
            steps {
                bat """
                    docker build -t savisaini123/yourhtmlsite:latest .
                """
            }
        }

        /* --------- PUSH TO DOCKER HUB --------- */
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    bat """
                        echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                        docker push savisaini123/yourhtmlsite:latest
                    """
                }
            }
        }

        /* --------- DEPLOYMENT --------- */
        stage('Deploy') {
            steps {
                echo 'Deployment step for static HTML container...'
            }
        }

        /* --------- TEST JAVA VERSION --------- */
        stage('Test Java Version') {
            steps {
                bat """
                    echo Checking Java version...
                    "%JAVA_HOME%\\bin\\java.exe" -version
                """
            }
        }

        /* --------- SONARQUBE SCAN --------- */
        stage('SonarQube Scan') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        bat """
                            "%SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=smartcampus ^
                            -Dsonar.sources=. ^
                            -Dsonar.host.url=%SONAR_HOST_URL% ^
                            -Dsonar.login=%SONAR_TOKEN%
                        """
                    }
                }
            }
        }
    }
}
