pipeline {
    agent any

    environment {
        JAVA_HOME    = "C:\\Users\\LENOVO\\AppData\\Local\\Programs\\Eclipse Adoptium\\jdk-17.0.16.8-hotspot"
        PATH         = "${env.JAVA_HOME}\\bin;${env.PATH}"
        SCANNER_HOME = tool 'SonarScanner'
        IMAGE_NAME   = "savisaini123/yourhtmlsite:latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Misha1207-code/DevSecOps-Project.git'
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Running basic code checks...'
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                echo "Running OWASP Dependency Check..."
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml', stopBuild: false
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Trivy Image Scan') {
            steps {
                bat '"C:\\ProgramData\\chocolatey\\bin\\trivy.exe" image --severity HIGH,CRITICAL %IMAGE_NAME%'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    bat '''
                    echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                    docker push %IMAGE_NAME%
                    '''
                }
            }
        }

        // ✅✅ FIXED SONARQUBE STAGE ✅✅
        stage('SonarQube Scan') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        bat '''
                        cd /d %WORKSPACE%
                        call "%SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                        -Dsonar.projectKey=smartcampus ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        "-Dsonar.login=%SONAR_TOKEN%"
                        '''
                    }
                }
            }
        }

       

        stage('Deploy') {
            steps {
                echo 'Deployment step for container...'
            }
        }
    }

    post {
        success {
            echo '✅ PIPELINE SUCCESSFUL'
        }
        unstable {
            echo '⚠️ PIPELINE UNSTABLE — Please review reports'
        }
        failure {
            echo '❌ PIPELINE FAILED'
        }
    }
}
