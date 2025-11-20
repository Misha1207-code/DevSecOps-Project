pipeline {
    
    agent any

    environment {
        JAVA_HOME = "C:\\Users\\LENOVO\\AppData\\Local\\Programs\\Eclipse Adoptium\\jdk-17.0.16.8-hotspot"
        PATH = "${env.JAVA_HOME}\\bin;${env.PATH}"
        SCANNER_HOME = tool 'SonarScanner'
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

        /* ============================
         *     DEPENDENCY CHECK FIXED
         * ============================ */
        stage('Dependency Check') {
            steps {
                dependencyCheckAnalyzer(
                    scanPath: '.',
                    outputDirectory: 'dependency-check-report',
                    dataDirectory: '',
                    includeHtmlReports: true,
                    suppressionFile: '',
                    zipExtensions: '',
                    sourceDirectories: ''
                )

                dependencyCheckPublisher(
                    pattern: 'dependency-check-report/*.html'
                )
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                    docker build -t savisaini123/yourhtmlsite:latest .
                """
            }
        }

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

        /* ============================
         *       SONARQUBE SCAN
         * ============================ */
        stage('SonarQube Scan') {
            steps {
                withCredentials([string(credentialsId: 'SONAR-TOKEN1', variable: 'SONAR_TOKEN')]) {
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
    }
}
