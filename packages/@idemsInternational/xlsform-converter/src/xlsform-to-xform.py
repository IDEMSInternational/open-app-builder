from pathlib import Path
import subprocess

directory_name= 'forms'

# Convert all xls/xlsx to xml
open_files = Path(directory_name).glob('*.xls*')
for file in open_files:
    # call xls2xform module from command line process
    # NOTE - form validation requires java 8+
    process = subprocess.Popen(["xls2xform", "--skip_validate",file], stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    stdout, stderr
