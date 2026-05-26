import os
import smtplib
import logging
from datetime import datetime
from email.message import EmailMessage
from getpass import getpass

import pandas as pd


# ================= FILE PATHS =================

CONTACTS_FILE = "data/contacts.csv"
REMINDERS_FILE = "data/reminders.csv"
TEMPLATE_FILE = "templates/email_template.txt"
REPORT_FILE = "outputs/email_report.csv"
LOG_FILE = "logs/app.log"


# ================= CREATE FOLDERS =================

os.makedirs("logs", exist_ok=True)
os.makedirs("outputs", exist_ok=True)


# ================= LOGGING SETUP =================

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


# ================= SMTP USER INPUT =================

print("\n===== Email Automation & Reminder System =====")

DRY_RUN_CHOICE = input("Do you want dry run mode? (yes/no): ").lower()

if DRY_RUN_CHOICE == "yes":
    DRY_RUN = True
    SMTP_EMAIL = "dryrun@example.com"
    SMTP_PASSWORD = ""
else:
    DRY_RUN = False
    SMTP_EMAIL = input("Enter your Gmail address: ")
    SMTP_PASSWORD = getpass("Enter your Gmail App Password: ")

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


# ================= LOAD TEMPLATE =================

def load_template():
    with open(TEMPLATE_FILE, "r", encoding="utf-8") as file:
        return file.read()


# ================= SEND EMAIL FUNCTION =================

def send_email(to_email, subject, body):
    if DRY_RUN:
        print("\n========== DRY RUN EMAIL ==========")
        print(f"To: {to_email}")
        print(f"Subject: {subject}")
        print(body)
        print("===================================")
        return "DRY_RUN_SUCCESS"

    msg = EmailMessage()
    msg["From"] = SMTP_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(msg)

    return "SENT"


# ================= MAIN FUNCTION =================

def main():
    try:
        contacts = pd.read_csv(CONTACTS_FILE)
        reminders = pd.read_csv(REMINDERS_FILE)
        template = load_template()
    except Exception as e:
        print("\n❌ File loading error:", e)
        return

    report = []

    for _, reminder in reminders.iterrows():
        name = reminder["name"]

        contact_row = contacts[contacts["name"] == name]

        if contact_row.empty:
            status = "FAILED"
            error = "Contact not found"
            email = "N/A"
        else:
            email = contact_row.iloc[0]["email"]

            subject = f"Reminder: {reminder['reminder_title']}"

            body = template.format(
                name=reminder["name"],
                reminder_title=reminder["reminder_title"],
                reminder_date=reminder["reminder_date"],
                reminder_time=reminder["reminder_time"]
            )

            try:
                status = send_email(email, subject, body)
                error = ""
                logging.info(f"Email processed successfully for {email}")
            except Exception as e:
                status = "FAILED"
                error = str(e)
                logging.error(f"Email failed for {email}: {error}")

        report.append({
            "name": name,
            "email": email,
            "reminder_title": reminder["reminder_title"],
            "status": status,
            "error": error,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })

    pd.DataFrame(report).to_csv(REPORT_FILE, index=False)

    print("\n✅ Project executed successfully.")
    print(f"📄 Report saved at: {REPORT_FILE}")
    print(f"📝 Log saved at: {LOG_FILE}")


# ================= PROGRAM START =================

if __name__ == "__main__":
    main()