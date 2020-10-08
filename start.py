import awsMonitoring
import string

print("Which cloud provider would you like to monitor?")

cloudProvider = input().lower()
availableClouds = ['aws','gcp','azure']

if cloudProvider in availableClouds:
    if cloudProvider == 'aws':
        awsMonitoring.connectToRegion()
else:
    print("end")
