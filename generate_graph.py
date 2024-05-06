import pandas as pd
import matplotlib.pyplot as plt

def generate_graph():
    # Load dataset
    dataset = pd.read_excel('dataset.xlsx')  # Assuming the dataset file is named dataset.xlsx

    # Extract X and Y columns from the dataset
    x_values = dataset['X']
    y_values = dataset['Y']

    # Generate the plot
    plt.plot(x_values, y_values)
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('X vs Y')

    # Save the plot as an image file
    plt.savefig('static/plot.png')  # Save the plot in the static directory

# Call generate_graph function when the script is executed
if __name__ == "__main__":
    generate_graph()
