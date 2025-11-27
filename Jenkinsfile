pipeline {
    agent any

    environment {
        JAVA_HOME = "C:\\Users\\LENOVO\\AppData\\Local\\Programs\\Eclipse Adoptium\\jdk-17.0.16.8-hotspot"
        PATH = "${env.JAVA_HOME}\\bin;${env.PATH}"
        SCANNER_HOME = tool 'SonarScanner'
        IMAGE_NAME = "savisaini123/yourhtmlsite"
        IMAGE_TAG  = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Misha1207-code/DevSecOps-Project.git'
            }
        }

        stage('Code Analysis') {
            steps {
                echo 'Running basic checks for HTML / JS project...'
            }
        }

        /* ========================================
         *           DEPENDENCY CHECK
         * ======================================== */
        stage('Dependency Check') {
            steps {
                echo "Running OWASP Dependency Check..."
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml', stopBuild: false
            }
        }

        /* ========================================
         *           DOCKER BUILD
         * ======================================== */
        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image..."
                bat """
                    docker build -t %IMAGE_NAME%:%IMAGE_TAG% .
                """
            }
        }


        /* ========================================
         *           ✅ TRIVY IMAGE SCAN
         * ======================================== */
        stage('Trivy Image Scan') {
            steps {
                echo "Scanning Docker Image with Trivy..."
                bat """
                    trivy image --severity HIGH,CRITICAL --exit-code 0 %IMAGE_NAME%:%IMAGE_TAG%
                """
            }
        }

        /* ========================================
         *           DOCKER PUSH
         * ======================================== */
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    bat """
                        echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
                        docker push %IMAGE_NAME%:%IMAGE_TAG%
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment step for static HTML container...'
            }
        }

        stage('Test Java Version') {
            steps {
                bat """
                    echo Checking Java version...
                    "%JAVA_HOME%\\bin\\java.exe" -version
                """
            }
        }

        /* ========================================
         *          ✅ SONARQUBE SCAN
         * ======================================== */
        stage('SonarQube Scan') {
            steps {
                withCredentials([string(credentialsId: 'SNAR', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        bat """
                            "%SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=smartcampus ^
                            -Dsonar.sources=. ^
                            -Dsonar.host.url=http://localhost:9000 ^
                            -Dsonar.login=%SONAR_TOKEN%
                        """
                    }
                }
            }
        }

        /* ========================================
         *           QUALITY GATE
         * ======================================== */
        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
    }

    post {
        success {
            echo '✅ PIPELINE SUCCESSFUL'
        }

        unstable {
            echo '⚠️ PIPELINE UNSTABLE - Check reports but NOT FAILED'
        }

        failure {
            echo '❌ PIPELINE FAILED'
        }

        always {
            echo '✅ DevSecOps Pipeline Finished'
        }
    }
}
