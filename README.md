<div align="center">

# Github Activity Generator

</div>

<div align='center'>

**Disclaimer: This project was created for fun and to learn how to automate tasks using Python and JavaScript.**

</div>

<p align="center">
	<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXhrc2dobmYzYndvMGpuNzdjeXdnbXJ5NmF6ano1ZW52M2Jpb3ZjYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NytMLKyiaIh6VH9SPm/giphy.gif" height="200" width="200" alt="GitHub Spray logo"/>
</p>


This is a project done for fun, but at the same time it serves a purpose. Usually when you work you can be that your company or work team change their branch control system, so it is normal that the activities performed are lost making your profile can look a little ugly.

You can use any of these scripts to be able to have those activities back, of course taking into account the limitations of having it in a repo.

You can download the script and use it in multiple repositories if you want.

I'm NOT responsible for the use that each person makes with the script, it's just for fun and learning.

## How to Use?

This project is available in Python and JavaScript (Node.js), choose your preferred language and follow the instructions below:

Using **Python**:

1.  Ensure you have Python 3 and Git installed on your machine.

```bash
$ python3 --version
$ git --version
```

2.  Configure Git with your GitHub account (make sure git push works properly).

```bash
$ git config --global user.name "Your Name"
$ git config --global user.email "your-email@example.com"
```

3.  Create an empty repository on GitHub (public or private, but private is recommended) without initializing it (no README or other files).

- Go to your GitHub account and create a new repository:
- Visit github.com/new.
- Enter a repository name, and set it to private (recommended).
- Do not initialize the repository

1.  Download the main.py file and open it in your text editor.
2.  Delete any existing commit.txt file in the project folder `$ rm commit.txt` or using the file explorer.
3.  Modify the following variables in main.py to configure the script as per your needs:

```python
total_day = 366 # Total number of days to go back
commit_frequency = 10 # Number of commits per day
repo_link = "<https://github.com/your-username/your-repo.git>" # Repository link
variability = False # Set to True for random commits per day
```

7.  Run the script from your terminal:

```bash
$ python3 main.py
```

Similar to the before steps but using **JavaScript (Node.js)`**:

1.  Ensure you have Node.js, npm, and Git installed on your machine.
2.  Configure Git with your GitHub account (make sure git push works properly).
3.  Create an empty repository on GitHub (public or private, but private is recommended) without initializing it (no README or other files).
4.  Clone this repository and install the required dependencies:
5.  Open the generate-commits.js file in your text editor and customize the following variables:

```js
const totalDays = 366; // Total number of days to go back
const commitFreq = 10; // Number of commits per day
const repoLink = "<https://github.com/your-username/your-repo.git>"; // Repository link
const variability = false; // Set to true for random commits per day
```

6.  Run the script from your terminal:

```bash
$ npm run start # or node index.js
```

The script will generate commits, push them to your repository, and create a `commit.txt` file to track changes.

That’s it! Your GitHub profile will now look much more active.

### Troubleshooting

Have questions or run into issues? Please open an issue, and I’ll do my best to help you!
