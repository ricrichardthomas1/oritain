# oritain
Repo housing my solution for coding assignment for the interview for the role of Junior Data Engineer at Oritain

Data Sorting Rules:
Iterate over each cell and each row of the worksheet and check for the following
1.	If cell value == null or cell value == undefined, the value is considered missing. A tracker keeps note of this for each row.
2.	Rows with missing values are to be pushed to one array and ones with no missing values detected to be pushed to another array.
3.	Segregated arrays are converted to sheet objects and appended to the original file. “Gold_Customers” contains Date with no missing values while “Bronze_Customers” contains data with missing values in the original file.

Data Cleaning techniques:
Modules: xlsx, moment
1.	Replacing missing values with “N/A”: Alongside tracking missing values for each loop, the missing cell values are replaced with “N/A” to flag that these are indeed values missing at source and eliminate any room for speculation.
2.	Converting Date strings to proper Date format: The cell values from ‘Collection_Date’ column which couldn’t be loaded as date values , since they might just be of the string type, are converted to Date using the moment module to ensure consistency of formatting. 

