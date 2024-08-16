# Digital Time Capsule DApp

## Introduction

The **Digital Time Capsule DApp** is a decentralized application that allows users to create digital time capsules containing messages or files. These capsules can be securely stored and set to unlock at a specific future date. Built on Cartesi Rollups, this DApp ensures that your digital memories are protected and only accessible at the time you choose.

## Key Features

- **Create Time Capsules:** Users can craft personalized time capsules with messages or files, set to unlock at a future date of their choosing.
- **Unlock Capsules:** Once the predetermined date has arrived, users can unlock and view the contents of their time capsules.
- **Explore Capsules:** View a list of all time capsules created on the platform.

## Directory Layout

```plaintext
digital-time-capsule/
├── src/
│   ├── controller/
│   │   └── capsuleController.js  # Business logic for managing time capsules
│   ├── storage/
│   │   └── capsuleStorage.js  # Persistent storage handling for time capsules
│   ├── utils.js  # Helper functions for data conversions
│   ├── index.js  # Primary application logic and API integration
├── package.json  # Node.js dependencies and scripts
├── README.md  # Project overview and instructions
└── .gitignore  # Git version control exclusions
```

## Getting Started

### Requirements

- **Node.js:** Version 14 or higher is recommended.
- **Cartesi Rollups:** Ensure your environment is configured for Cartesi Rollups. Follow the official documentation if needed.

### Installation Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/digital-time-capsule.git
   cd digital-time-capsule
   ```

2. **Install Necessary Packages:**

   Navigate to the project directory and install the required dependencies:

   ```bash
   npm install
   ```

3. **Build the Application:**

   Compile the project with:

   ```bash
   npm run build
   ```

4. **Run the DApp:**

   Ensure the Cartesi machine is running, then start the application:

   ```bash
   npm run start
   ```

## How to Use the DApp

### Creating a Time Capsule

- **Endpoint:** `/advance_state`
- **Action:** `create_capsule`
- **Request Payload:**
  ```json
  {
    "lockDate": "2026-01-01T00:00:00Z",
    "message": "Hello, future!"
  }
  ```

  This request will create a time capsule that will unlock on New Year's Day, 2026.

### Retrieving a Time Capsule

- **Endpoint:** `/inspect_state`
- **Action:** `capsule/{id}`
- **Parameters:** Capsule ID

  After the lock date has passed, this action will retrieve the contents of the specified time capsule.

### Listing All Capsules

- **Endpoint:** `/inspect_state`
- **Action:** `list_capsules`

  This action will return a list of all time capsules created on the platform, with their respective lock dates.

## Licensing Information

This project is distributed under the MIT License. For more details, refer to the [LICENSE](LICENSE) file.

## Contributions

We welcome contributions from the community. If you have ideas for improvements or find issues, please open an issue or submit a pull request.

## Support & Contact

For questions or feedback, feel free to reach out at [your-email@example.com]. We appreciate your input and are here to help!