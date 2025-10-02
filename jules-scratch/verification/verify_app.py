from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Generate a unique title for the snippet
    snippet_title = f"My Python Snippet {int(time.time())}"

    try:
        # Navigate to the app
        page.goto("http://localhost:3000")

        # 1. Create a new "Code" snippet
        page.get_by_role("button", name="Create Snippet").click()

        # Wait for the form to appear
        expect(page.get_by_role("heading", name="Create Snippet")).to_be_visible()

        # Fill out the form
        page.get_by_label("Title").fill(snippet_title)
        page.get_by_role("textbox", name="Category").fill("Code")

        # The language dropdown should now be visible
        expect(page.get_by_label("Language")).to_be_visible()
        page.get_by_label("Language").select_option("Python")

        page.locator('#create-type').select_option("Code")
        page.get_by_label("Content").fill("print('Hello from Playwright!')")

        # Create the snippet
        page.get_by_role("button", name="Create", exact=True).click()

        # Wait for the toast notification
        expect(page.get_by_text("Snippet created ✅")).to_be_visible()

        print("Verification script ran successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)