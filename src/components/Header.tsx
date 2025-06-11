import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="p-2 bg-primary rounded-lg">
							<FileText className="h-6 w-6 text-primary-foreground" />
						</div>
						<span className="text-xl font-bold text-foreground">
							ResumeAI
						</span>
					</div>

					<nav className="hidden md:flex items-center space-x-8">
						<a
							href="#features"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							Features
						</a>
						<a
							href="#how-it-works"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							How it Works
						</a>
						<a
							href="#pricing"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							Pricing
						</a>
					</nav>

					<div className="hidden md:flex items-center space-x-4">
						<Link to="/sign-in">
							<Button variant="ghost">Sign In</Button>
						</Link>
						<Link to="/register">
							<Button>Get Started</Button>
						</Link>
					</div>

					<button
						className="md:hidden p-2"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<Menu className="h-6 w-6" />
					</button>
				</div>

				{isMenuOpen && (
					<div className="md:hidden mt-4 py-4 border-t border-border">
						<nav className="flex flex-col space-y-4">
							<a
								href="#features"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Features
							</a>
							<a
								href="#how-it-works"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								How it Works
							</a>
							<a
								href="#pricing"
								className="text-muted-foreground hover:text-foreground transition-colors"
							>
								Pricing
							</a>
							<div className="flex flex-col space-y-2 pt-4">
								<Link to="/sign-in">
									<Button variant="ghost" className="w-full">
										Sign In
									</Button>
								</Link>
								<Link to="/register">
									<Button className="w-full">Get Started</Button>
								</Link>
							</div>
							<div className="border-t border-border pt-4">
								<Link
									to="/profile"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									onClick={() => setIsMenuOpen(false)}
								>
									Profile
								</Link>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};
